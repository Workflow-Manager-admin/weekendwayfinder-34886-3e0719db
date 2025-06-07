import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeRoute = '/home';

  private router: Router;

  constructor(router: Router) {
    this.router = router;
    // Track active route for highlighting the correct nav button
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Angular NavigationEnd.urlAfterRedirects gives full path with /
        // Only highlight for exact routes
        if (event.urlAfterRedirects && (event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/signin')) {
          this.activeRoute = event.urlAfterRedirects;
        } else if (event.urlAfterRedirects === '/' || event.urlAfterRedirects === '') {
          this.activeRoute = '/signin';
        } else {
          this.activeRoute = '';
        }
      });
  }

  /**
   * PUBLIC_INTERFACE
   * Navigates to a specific page using Angular router programmatically.
   */
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
