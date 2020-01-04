import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  submitted = false;
  email = '';
  password = '';

  constructor(public auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  signIn() {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    } else if (this.signInForm.valid) {
      this.email = this.signInForm.value.email;
      this.password = this.signInForm.value.password;
      this.auth.signIn(this.email, this.password);
    }
  }
}
