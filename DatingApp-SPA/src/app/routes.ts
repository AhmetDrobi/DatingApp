import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRouts: Routes = [
    { path: '', component: HomeComponent },// Home route, if home was written it would cause problems for just localhost:4000 without /
    
    // tslint:disable-next-line: max-line-length
    {// A dumy root that will act as a big guard for all the childrens. Note that you could add canActivate to each root without having this father root, but it's this is faster and more expandable
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
            { path: 'members', component: MemberListComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
