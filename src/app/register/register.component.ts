import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: {
    email: String,
    password: String,
    confirmPassword: String,
    firstName: String,
    lastName: String,
    username: String
  };

  constructor(private auth: AuthService) { 
    this.user = {
      email: null,
      password: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      username: null
    }
  }

  ngOnInit() {
  }

  register() {
    if(this.user.username == null || this.user.password == null || this.user.email==null) {
      alert('Missing required fields');
    }
    else if(this.user.password != this.user.confirmPassword) {
      alert("Passwords don't match");
    } else {
      this.auth.register({
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      }).subscribe(
        (data) => {console.log(data)},
        (error) => { alert(error) }  
      )
    }
  }

}
