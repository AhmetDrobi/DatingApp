import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService) { }
  model: any = {};
  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Registeration Successful');
    }, error => {
      console.log(error);
    });

  }
  cancel() {
    console.log('Cancelled');
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
