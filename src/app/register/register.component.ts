import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: {};

  constructor(private auth: AuthService) { 
    this.user = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      username: null
    }
  }

  ngOnInit() {
  }

  register() {
    console.log(this.user)
    /* this.auth.register({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username
    }) */
  }

}
