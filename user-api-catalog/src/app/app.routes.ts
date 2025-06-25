import { Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UserResolver } from './service/user.resolver';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'users/:uuid', component: UserDetailComponent, resolve: { resolvedResponse: UserResolver } },
    { path: '**', redirectTo: 'users' },
];
