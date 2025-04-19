// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    
    // Allow access to public routes without authentication
    if (publicRoutes.includes(state.url)) {
      return true;
    }

    // Check if user is authenticated
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    }

    // If user is authenticated, handle redirection based on the role
    if (state.url === '/') {
      this.redirectByRole(currentUser.role);
      return false;
    }

    // Get the required roles for the requested route
    const requiredRoles = this.getRequiredRoles(next);
    
    // If roles are required and the current user doesn't have the right role, redirect
    if (requiredRoles?.length && !requiredRoles.includes(currentUser.role)) {
      this.router.navigate(['/unauthorized']); // Or any other page for unauthorized access
      return false;
    }

    return true;
  }

  private getRequiredRoles(route: ActivatedRouteSnapshot): string[] {
    let roles: string[] = [];
    let currentRoute: ActivatedRouteSnapshot | null = route;
    
    // Traverse up the route tree to find the roles required
    while (currentRoute) {
      if (currentRoute.data['roles']) {
        roles = currentRoute.data['roles'];
        break;
      }
      currentRoute = currentRoute.parent;
    }
    
    return roles;
  }

  private redirectByRole(role: string): void {
    const routes: { [key: string]: string } = {
      student: '/etudiant/dashboard',
      company: '/entreprise/dashboard',
      admin: '/admin-dashboard'
    };

    const redirectRoute = routes[role];
    if (redirectRoute) {
      this.router.navigate([redirectRoute]);
    }
  }
}
