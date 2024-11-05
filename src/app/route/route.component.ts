import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesearchService } from '../services/routesearch.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  from!: string;
  to!: string;
  duration: string = '';
  stops: string[] = [];
  map!: L.Map;

  constructor(private route: ActivatedRoute, private routeService: RoutesearchService) {}

  ngOnInit(): void {
    const lastRoute = this.routeService.getLastRoute();
    
    if (lastRoute) {
      this.from = lastRoute.from;
      this.to = lastRoute.to;
      this.loadRoute();
      this.initMap();
    }

    // Get the route parameters
    this.route.params.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.routeService.saveLastRoute(this.from, this.to); // Save route
      this.loadRoute();
      this.initMap();
    });
  }

  loadRoute() {
    // Calculate duration based on distance
    const distanceInKm = this.getDistance(this.from, this.to);
    this.duration = this.calculateDuration(distanceInKm).toFixed(2) + ' minutes'; // Duration in minutes
    this.stops = this.getStops(this.from, this.to);
  }

  getDistance(from: string, to: string): number {
    // Placeholder for distance calculation logic
    return 10; // Assume a default distance of 10 km
  }

  calculateDuration(distanceInKm: number): number {
    const averageSpeed = 20; // Average speed in km/h
    return (distanceInKm / averageSpeed) * 60; // Convert to minutes
  }

  getStops(from: string, to: string): string[] {
    return ['Stop A', 'Stop B', 'Stop C']; // Example stops
  }

  initMap() {
    this.map = L.map('map').setView([6.5538, 3.3542], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addMarker(this.from, [6.5538, 3.3542]);
    this.addMarker(this.to, [6.5638, 3.3642]);
  }

  addMarker(location: string, coordinates: [number, number]) {
    L.marker(coordinates).addTo(this.map).bindPopup(location).openPopup();
  }
}
