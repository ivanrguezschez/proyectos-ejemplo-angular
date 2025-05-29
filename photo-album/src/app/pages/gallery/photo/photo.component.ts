import { Component, Input } from '@angular/core';
import { Photo } from '../../../models/photo.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-photo',
  imports: [NgOptimizedImage],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent {
  @Input()
  photo!: Photo;
}
