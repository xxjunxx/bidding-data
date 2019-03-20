import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


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
    console.log(value);
  };

  // When user choose exist or new seller, validate relevant controls
  validateSellerID(): void {
    this.validateForm.controls.existSellerID.updateValueAndValidity();
    this.validateForm.controls.newSellerID.updateValueAndValidity();
    this.validateForm.controls.newRating.updateValueAndValidity();
    console.log(this.validateForm);
  }

  // If user choose exist seller, exist seller id must be required
  existSellerRequiredValidator = (control: FormControl): { [ s: string ]: boolean } => {
    debugger
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
    this.userService.getSellersByTextSearch(value).subscribe((result) => {
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

    this.userService.getSellerById(control.value).subscribe(result => {
      if (control.value != result[0]) {
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

    this.userService.getSellerById(control.value).subscribe(result => {
      if (control.value == result[0]) {
        observer.next({ error: true, exist: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  });

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.validateForm = this.fb.group({
      itemName: [ '', [ Validators.required ] ],
      country : [ '', [ Validators.required ] ],
      description : [ '', [ Validators.required ] ],
      location : [ '' ],
      isExist: [ true, [ Validators.required ]],
      existSellerID : [ '', [ this.existSellerRequiredValidator ], [ this.existSellerAsyncValidator ]],
      newSellerID : [ '' , [ this.newSellerRequiredValidator ],[ this.newSellerAsyncValidator ]],
      newRating: ['', [ this.newSellerRequiredValidator ]]
    });
  }
}
