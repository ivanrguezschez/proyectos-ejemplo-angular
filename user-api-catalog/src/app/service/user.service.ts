import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { Response } from '../interface/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) { }

  // Obtener usuarios
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe(
      map(this.processResponse)
    );
  }

  // Obtener un usuario por su uuid
  getUser(uuid: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map(this.processResponse)
    );
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.name} ${user.location.street.number} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: {
          latitude: Number(user.location.coordinates.latitude),
          longitude: Number(user.location.coordinates.longitude)
        }
      }))
    };
  }
}
