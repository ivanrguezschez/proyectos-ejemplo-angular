import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: GalleryComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'contact', component: ContactComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];
