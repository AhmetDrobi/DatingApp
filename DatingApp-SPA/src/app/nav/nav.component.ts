import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authSerivce: AuthService) { }

  ngOnInit() { }

  login() {
    this.authSerivce.login(this.model).subscribe(
      next => {
        console.log('logged in successfuly');
      },
      error => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token; // Short hand for if empty return false else return true
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
