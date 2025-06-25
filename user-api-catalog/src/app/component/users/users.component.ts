import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Response } from '../../interface/response.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  /*
    Para que la declaración de variables sin inicializar no diera error se añade 
    "strictPropertyInitialization": false, al archivo tsconfig.json
  */
  response: Response;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (results: Response) => {
        this.response = results;
      }
    );
  }

}
