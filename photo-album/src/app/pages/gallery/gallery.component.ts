import { Component, inject, OnInit } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { Photo } from '../../models/photo.model';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [PhotoComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {

  private galleryService = inject(GalleryService);

  photoList!: Photo[];

  ngOnInit(): void {
    this.galleryService.getPhotos().subscribe({
      next: (data) => {
        this.photoList = data['photos'];
      }
    });
  }
}
