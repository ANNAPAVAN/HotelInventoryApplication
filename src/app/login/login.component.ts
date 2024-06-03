import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { EmailvalidatorDirective } from '../emailValidator/emailvalidator.directive';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HoverDirective, EmailvalidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string='';
  password: string='';

  constructor( private route: Router, private loginService: LoginService){}
  ngOnInit(): void {

  }

  login(): void {
    if(this.loginService.login(this.email, this.password)){
      this.route.navigateByUrl('/rooms')
    }else{
      alert("Login Failed")
    }
  }
}
