import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authSerivce: AuthService, private alerify: AlertifyService) { }

  ngOnInit() { }

  login() {
    this.authSerivce.login(this.model).subscribe(
      next => {
        this.alerify.success("Logged in successfully");
      },
      error => {
        this.alerify.error(error);
      }
    );
  }

  loggedIn() {
    return this.authSerivce.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alerify.message('Logged out');
  }
}
