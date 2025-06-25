import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { User } from '../../interface/user.interface';
import { DatePipe } from '@angular/common';
import { Coordinate } from '../../interface/coordinate.interface';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-user-detail',
  imports: [RouterModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  //response: Response;
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Guardar Cambios' | 'Editar' = 'Editar';

  icon = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private activateRoute: ActivatedRoute, 
    private userService: UserService) {}
  
  ngOnInit(): void {
    /*
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.userService.getUser(params.get('uuid')!).subscribe(
        (response: any) => {
          this.response = response;
          this.user = response.results[0];
        }
      );
    })
    */
    this.user = (<User>(this.activateRoute.snapshot.data['resolvedResponse'].results[0]));
    this.loadMap(this.user.coordinate);
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    this.mode = this.mode === 'locked' ? 'edit': 'locked';
    this.buttonText = this.buttonText === 'Editar' ? 'Guardar Cambios' : 'Editar';
    if (mode === 'edit') {
      // Lógica para actualizar los datos del usuario en el back end
      console.log('Actualizando usando el back end');
    }
  }

  private loadMap(coordinate: Coordinate) {
    // https://leafletjs.com/
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    });

    const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(map);
    
    const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.icon });
    marker.addTo(map).bindPopup(`Localización de ${this.user.firstName}`).openPopup();
  }
}
