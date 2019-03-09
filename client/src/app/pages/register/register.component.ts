import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    
    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }
    
    this.adminService.register(this.validateForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          //this.alertService.error(error);
        });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }  
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email, Validators.required ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
    });
  }

}
