import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService,
        private authService: AuthService) {
    }
    // tslint:disable-next-line: max-line-length
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {// Resolve automaticly subscribe to observables, so we don't need .subscribe after getUser. But since we want to catch any errors, we will use pipes which just pipe whatever we write to the end of the command allowing us to use rxjs operators like catchError here or map in other examples
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving messages');
                    this.router.navigate(['/home']);
                    return of(null); // This is how to return a false for an observable (aka return null)
                })
            );
    }
}
