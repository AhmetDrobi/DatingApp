import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authSerivce: AuthService, private alerify: AlertifyService, private router: Router) { }

  ngOnInit() { }

  login() {
    this.authSerivce.login(this.model).subscribe(
      next => {
        this.alerify.success("Logged in successfully");
      },
      error => {
        this.alerify.error(error);
      }, () => {// Complete Case you could put this logic up in the next part
        this.router.navigate(['/members']);
      });
  }


  loggedIn() {
    return this.authSerivce.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alerify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
