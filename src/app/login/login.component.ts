import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Credentails } from './credentails';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private usernameValidationMessages = {
    required: 'Please enter your username',
    pattern: 'Please enter a valid username'
  };
  private passwordValidationMessages = {
    required: 'Please enter your password'
  };
  loginForm: FormGroup;
  passErrorMessage: string;
  userErrorMessage: string;
  cred: Credentails;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9-]+')]],
      password: ['', [Validators.required]]
    });
    const usernameControl = this.loginForm.get('username');
    usernameControl.valueChanges
      .subscribe(value => this.setUserErrorMessage(usernameControl));
      const passwordControl = this.loginForm.get('password');
      passwordControl.valueChanges
        .subscribe(value => this.setPassErrorMessage(passwordControl));
  }

  login() {
    console.log(this.loginForm.value);
    const username = this.loginForm.value.username;
    const pass = this.loginForm.value.password;
    this.loginService.getCredential().subscribe(credentials => {
      console.log(credentials);
      this.cred = credentials[0];
      if (this.cred.username === username && this.cred.password === pass) {
        console.log('successfully verified ');
        window.location.href = 'https://www.google.com';
        return true;
      }
      console.log('Invalid Credentials');
      return false;
    });
  }
  setUserErrorMessage(c: AbstractControl): void {
    this.userErrorMessage = '';
    if ((c.touched || c.dirty) && (c.errors || c.valid)) {
      this.userErrorMessage = Object.keys(c.errors).map( key =>
      this.usernameValidationMessages[key]).join(' ');
    }
  }

  setPassErrorMessage(c: AbstractControl): void {
    this.passErrorMessage = '';
    if (( c.dirty || c.touched) && c.errors) {
      this.passErrorMessage = Object.keys(c.errors).map( key =>
      this.passwordValidationMessages[key]).join(' ');
    }
  }
}
