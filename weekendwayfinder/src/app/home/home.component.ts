import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
})
/** Home page: personalized welcome based on user's name or email; intro text and button to planner. */
export class HomeComponent {
  userName: string = 'Traveler';

  constructor() {
    // SSR-safe access to localStorage
    let email = '';
    if (typeof globalThis.localStorage !== 'undefined') {
      email = globalThis.localStorage.getItem('ww_user_email') || '';
    }
    // Parse first part of email if present, capitalize
    this.userName =
      email && email.includes('@')
        ? this.capitalize(email.split('@')[0])
        : 'Traveler';
  }

  // PUBLIC_INTERFACE
  planMyTrip() {
    const router = inject(Router);
    router.navigate(['/planner']);
  }

  private capitalize(name: string): string {
    if (!name) return 'Traveler';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
