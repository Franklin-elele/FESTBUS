// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

interface Stop {
  name: string;
  distance: string;
  destination: string;
  routes: Route[];
}

interface Route {
  number: string;
  destination: string;
  eta: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map: L.Map | undefined;
  userLocation: L.LatLng | undefined;
  stops: Stop[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeMap();
    this.locateUser();
    this.generateStops();
  }

  // Initialize the Leaflet map
  initializeMap() {
    this.map = L.map('map').setView([6.5244, 3.3792], 13); // Lagos coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // Locate the user's exact position
  locateUser() {
    this.map?.locate({ setView: true, maxZoom: 16 });
    this.map?.on('locationfound', (e: L.LocationEvent) => {
      this.userLocation = e.latlng;
      L.marker(this.userLocation).addTo(this.map)
        .bindPopup('You are here')
        .openPopup();
      this.generateStops(); // Generate stops based on user location
    });
  }

  // Generate additional bus stops dynamically
  generateStops() {
    this.stops = [
      {
        name: 'Ikeja Bus Stop',
        distance: '5 min walk . towards',
        destination: 'Ojota or CMS',
        routes: [
          { number: '45', destination: 'CMS', eta: '20 min' },
          { number: '22', destination: 'Ikoyi', eta: '30 min' },
        ],
      },
      {
        name: 'Maryland Bus Stop',
        distance: '8 min walk . towards',
        destination: 'Yaba or Surulere',
        routes: [
          { number: '67', destination: 'Surulere', eta: '15 min' },
          { number: '3', destination: 'Yaba', eta: '25 min' },
        ],
      },
      {
        name: 'Lekki Bus Stop',
        distance: '10 min walk . towards',
        destination: 'Ajah or Victoria Island',
        routes: [
          { number: '101', destination: 'Ajah', eta: '10 min' },
          { number: '56', destination: 'Victoria Island', eta: '35 min' },
        ],
      },
      {
        name: 'Ojuelegba Bus Stop',
        distance: '7 min walk . towards',
        destination: 'Surulere or CMS',
        routes: [
          { number: '15', destination: 'Surulere', eta: '10 min' },
          { number: '55', destination: 'CMS', eta: '25 min' },
        ],
      },
      {
        name: 'Anthony Bus Stop',
        distance: '6 min walk . towards',
        destination: 'Ikeja or Ketu',
        routes: [
          { number: '102', destination: 'Ketu', eta: '8 min' },
          { number: '45', destination: 'Ikeja', eta: '12 min' },
        ],
      },
    ];
  }


  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    if (input.length >= 3) {
      this.router.navigate(['/search'], { queryParams: { query: input } });
    }
  }

}
