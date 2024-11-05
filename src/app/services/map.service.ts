import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getUserLocation(): Observable<any> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          observer.next(position);
          observer.complete();
        }, err => observer.error(err));
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getNearbyBusStops(): Observable<any[]> {
    // Mock bus stops for now
    return new Observable(observer => {
      const stops = [
        { name: 'Bus Stop 1', buses: 'Bus 25, Bus 30' },
        { name: 'Bus Stop 2', buses: 'Bus 15, Bus 10' }
      ];
      observer.next(stops);
      observer.complete();
    });
  }
}
