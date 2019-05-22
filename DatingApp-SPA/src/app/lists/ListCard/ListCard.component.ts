import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-ListCard',
  templateUrl: './ListCard.component.html',
  styleUrls: ['./ListCard.component.css']
})
export class ListCardComponent implements OnInit {
  @Input() user: User;
  @Output() dislikedUser = new EventEmitter<number>();
  constructor(private autService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  removeLike(id: number) {
    this.userService.dislike(this.autService.decodedToken.nameid, id).subscribe(data => {
      this.dislikedUser.emit(id);
      this.alertify.success(`You have disliked ${this.user.knownAs}`);

    }, error => {
      this.alertify.error(error);
    });
  }

}
