import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../entities/user.model';

@Component({
  standalone:false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  role: 'company' | 'student' | null = null;
  currentUser: User | null = null;
  private loginSub!: Subscription; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateAuthState();
    this.loginSub = this.authService.isLoggedIn$.subscribe(() => {
      this.updateAuthState();
    });
  }

  private updateAuthState(): void {
    this.isLoggedIn = !!this.authService.getCurrentUser();
    this.currentUser = this.authService.getCurrentUser();
    this.role = this.currentUser?.role as 'company' | 'student' || null;
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.currentUser 
      ? this.router.navigate([`/${this.currentUser.role}/profile`])
      : this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.updateAuthState();
  }
}