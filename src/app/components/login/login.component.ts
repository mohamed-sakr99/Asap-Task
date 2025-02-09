import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { ToastrService } from 'ngx-toastr'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgIf,MatFormFieldModule ,MatInputModule,MatIconModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide :boolean = true;
  loginForm!: FormGroup;

  constructor(private FB: FormBuilder,
    private authService: AuthService,
    private Router: Router,
    private toaster: ToastrService) {
    this.createLoginForm();
  }


  //IniTilization Login Form
  createLoginForm() {
    this.loginForm = this.FB.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // get login Form Control
  get loginFormControl() {
    return this.loginForm.controls
  }

  // On Login Form
  submit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      console.log("Response:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        this.Router.navigateByUrl('/home')// Navigate to layout (home); 
        this.toaster.success('login successfuly')
      }
    }, (error: any) => {
      this.toaster.error('user name or password is invalid')

    });
  }

}
