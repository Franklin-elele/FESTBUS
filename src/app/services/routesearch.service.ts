import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesearchService {

  // Method to calculate arrival and drop-off times
  calculateTimes(): { arrivalTime: string; dropOffTime: string } {
    const currentTime = new Date();

    // Calculate arrival time as current time + 15 minutes
    const arrival = new Date(currentTime.getTime() + 15 * 60 * 1000);
    const arrivalTime = arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Calculate drop-off time as arrival time + 15 minutes
    const dropOff = new Date(arrival.getTime() + 15 * 60 * 1000);
    const dropOffTime = dropOff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { arrivalTime, dropOffTime };
  }

  saveLastRoute(from: string, to: string) {
    localStorage.setItem('lastRoute', JSON.stringify({ from, to }));
  }

  getLastRoute() {
    const lastRoute = localStorage.getItem('lastRoute');
    return lastRoute ? JSON.parse(lastRoute) : null;
  }

  clearLastRoute() {
    localStorage.removeItem('lastRoute');
  }
}
