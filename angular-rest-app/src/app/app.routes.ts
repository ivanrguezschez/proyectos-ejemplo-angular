import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';

export const routes: Routes = [
    { path: 'posts', component: PostListComponent },
    { path: 'posts/create', component: PostCreateComponent },
    { path: 'posts/edit/:id', component: PostCreateComponent }, 
    { path: '', redirectTo: '/posts', pathMatch: 'full' }
];
