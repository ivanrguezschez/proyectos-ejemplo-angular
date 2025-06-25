import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Response } from '../interface/response.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ 
  providedIn: 'root' 
})
export class UserResolver implements Resolve<Response> {
  
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.userService.getUser(route.paramMap.get('uuid')!);
  }
} 
