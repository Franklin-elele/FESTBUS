import { Component, OnInit } from '@angular/core';
import { RoutesearchService } from '../services/routesearch.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  from: string = '';
  to: string = '';
  results: { from: string; to: string; arrivalTime: string; dropOffTime: string }[] = [];
  errorMessage: string = ''; // For displaying validation errors

  busStops: string[] = [
    'Festac First Gate', 'Second Gate (Second Avenue)', 'Apple Junction', 'Festac Link Road', 
    'Mile 2 Bus Terminal', 'Alakija', 'Festival Mall', 'Ago Palace Way Junction', 'Durbar Road', 
    '7th Avenue', '21 Road', 'Abule Ado Junction', 'Oluti', 'Trade Fair Complex', 
    'Iyana Isashi', 'Satellite Town', 'Iyana Oba', 'Jakande Gate'
  ];

  constructor(private routeService: RoutesearchService , private router: Router) {}

  navigateToRoute(from: string, to: string) {
    this.router.navigate(['/route', from, to]);
  }

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults() {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      this.results = JSON.parse(savedResults);
    }
  }

  calculateTimes() {
    // Reset error message
    this.errorMessage = '';
  
    // Validation to check if starting and destination points are selected and different
    if (!this.from || !this.to) {
      this.errorMessage = 'Please select both a starting point and a destination.';
      return;
    }
    if (this.from === this.to) {
      this.errorMessage = 'Starting point and destination cannot be the same.';
      return;
    }
  
    // Save the last searched route
    this.routeService.saveLastRoute(this.from, this.to);
  
    // Get arrival and drop-off times from the service
    const times = this.routeService.calculateTimes();
    this.results.push({
      from: this.from,
      to: this.to,
      arrivalTime: times.arrivalTime,
      dropOffTime: times.dropOffTime
    });
  
    // Clear selections after adding result
    this.from = '';
    this.to = '';
  }
  
  saveResults() {
    localStorage.setItem('searchResults', JSON.stringify(this.results));
  }

  deleteResult(index: number) {
    this.results.splice(index, 1);
    this.saveResults();
  }

 
  
}
