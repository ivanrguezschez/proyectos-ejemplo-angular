import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private http = inject(HttpClient);

  constructor() { }

  getPhotos(): Observable<any> {
    return this.http.get<any>('/data.json');
  }
}
