import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Services/user';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberme: ['']
    });

  }

  get fval() {
    return this.registerForm.controls;
  }

  login(formValue) {
    console.log(formValue)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let userDetail = {
      "email": '', "password": ''
    }
    userDetail.email = formValue.email;
    userDetail.password = formValue.password;
    this.userService.login(userDetail).subscribe(response => {
      console.log(response.body)
      this.router.navigate(['/users'])
    }, err => {
      if (err.status = 400) {
        this.showError = true;
      }
    })
  }

  reset() {
    this.showError = false;
    (document.getElementById("registerFormReset") as HTMLFormElement).reset();
  }
}
