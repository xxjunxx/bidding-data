import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent  {
  validateForm: FormGroup;

  existSellerOptions: string[] = [];

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.itemService.postCreateItem(value.itemName, value.country, value.location, value.description, value.isExist, value.existSellerName, value.newSellerName, value.newRating)
      .subscribe(result => {
        if (result[0].result === "success") {
          this.router.navigate(['//manage/item-list/' + result[0].itemId]);
        }
      });
  };

  // When user choose exist or new seller, validate relevant controls
  validateSellerName(): void {
    this.validateForm.controls.existSellerName.updateValueAndValidity();
    this.validateForm.controls.newSellerName.updateValueAndValidity();
    this.validateForm.controls.newRating.updateValueAndValidity();
    console.log(this.validateForm);
  }

  // If user choose exist seller, exist seller id must be required
  existSellerRequiredValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if(this.validateForm === undefined) {
      return {};
    }

    if (!control.value && this.validateForm.controls.isExist.value) {
      
      return { required: true};
    }
     
    return {};
  }

  // For auto complete possible exist sellers
  onExistSellerInput(value: string): void {
    this.userService.getSellersByNameElasticSearch(value, 10).subscribe((result) => {
      this.existSellerOptions = result;
    });
  }

  // Check if the input seller id exists 
  existSellerAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    if (this.validateForm === undefined) {
      observer.next(null);
      observer.complete();
      return;
    }

    if (!this.validateForm.controls.isExist.value) {
      observer.next(null);
      observer.complete();
      return;
    }

    this.userService.getSellerByName(control.value).subscribe(result => {
      if (result.length === 0) {
        observer.next({ error: true, not_exist: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  });


  // If user choose new seller, exist seller id must be required
  newSellerRequiredValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if(this.validateForm == undefined) {
      return {};
    }

    if (!control.value && !this.validateForm.controls.isExist.value) {
      return { required: true};
    }
     
    return {};
  }

  // Check if there are duplicate seller id 
  newSellerAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    if (this.validateForm === undefined) {
      observer.next(null);
      observer.complete();
      return;
    }

    if (this.validateForm.controls.isExist.value) {
      observer.next(null);
      observer.complete();
      return;
    }

    this.userService.getSellerByName(control.value).subscribe(result => {
      if (result.length != 0) {
        observer.next({ error: true, exist: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  });

  constructor(private fb: FormBuilder, private userService: UserService, private itemService: ItemService, private router: Router) {
    this.validateForm = this.fb.group({
      itemName: [ '', [ Validators.required ] ],
      country : [ '', [ Validators.required ] ],
      description : [ '', [ Validators.required ] ],
      location : [ '' ],
      isExist: [ true, [ Validators.required ]],
      existSellerName : [ '', [ this.existSellerRequiredValidator ], [ this.existSellerAsyncValidator ]],
      newSellerName : [ '' , [ this.newSellerRequiredValidator ],[ this.newSellerAsyncValidator ]],
      newRating: ['', [ this.newSellerRequiredValidator ]]
    });
  }
}
