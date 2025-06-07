import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule, FormsModule],
})
/** Sign-In page: email/password with sign-in button. Mobile-friendly, scenic background. */
export class SigninComponent {
  email = '';
  password = '';
  error: string | null = null;
  success = false;

  // PUBLIC_INTERFACE
  signIn() {
    const router = inject(Router);
    // Simple client-side "authentication": accept any non-empty values, store username in localStorage.
    if (!this.email || !this.password) {
      this.error = 'Please enter your email and password.';
      this.success = false;
      return;
    }
    this.error = null;
    // Store user in localStorage (for demo), SSR-safe
    if (typeof globalThis.localStorage !== 'undefined') {
      globalThis.localStorage.setItem('ww_user_email', this.email);
    }
    this.success = true;
    // Simulate short delay then redirect to Home
    if (typeof globalThis.setTimeout !== 'undefined') {
      globalThis.setTimeout(() => {
        router.navigate(['/home']);
      }, 800);
    } else {
      router.navigate(['/home']);
    }
  }
}
