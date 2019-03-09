import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
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

    this.authenticationService.login(this.validateForm.controls.email.value, this.validateForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/search']);
        },
        error => {
          //this.alertService.error(error);
        });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [ null, [ Validators.email, Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }
  
}
