import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../entities/user.model';
import { authRequest } from './model/authRequest';
import { AuthUser } from './model/AuthUser';
import { AuthResponse } from './model/authresponse';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  private readonly usersKey = 'registeredUsers';

  constructor(private router: Router, private httpClient: HttpClient) {
    this.initializeStorage();
    this.loadCurrentUser();
  }

  // Méthodes publiques
  login(email: string, password: string): boolean {
    const user = this.validateCredentials(email, password);
    if (user) {
      this.setSession(user);
      return true;
    }
    return false;
  }

  register(userData: Partial<User>): Observable<User> {
    const newUser = this.createUser(userData);
    this.saveUser(newUser);
    return of(newUser);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Méthodes privées
  private initializeStorage(): void {
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify(this.getMockUsers()));
    }
  }

  private getMockUsers(): User[] {
    return [
      { 
        id: '1', email: 'student@test.com', role: 'student', isActive: true,
        firstName: 'John', lastName: 'Doe', password: 'password123',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: '2', email: 'company@test.com', role: 'company', isActive: true,
        companyName: 'Test Corp', firstName: '', lastName: '',
        password: 'password123', createdAt: new Date(), updatedAt: new Date()
      }
    ];
  }

  private validateCredentials(email: string, password: string): User | undefined {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return users.find((u: User) => u.email === email && u.password === password);
  }
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  private setSession(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private createUser(userData: Partial<User>): User {
    return {
      ...userData,
      id: this.generateId(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as User;
  }

  private saveUser(user: User): void {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private clearSession(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private loadCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.currentUserSubject.next(JSON.parse(user));
  }


  logIn(authBody: authRequest): Observable<{ user: AuthUser, token: string }>{

    return this.httpClient.post<AuthResponse>("http://localhost:8080/v1/auth/signin", authBody).
    pipe(
      map(
        response => ({ 
          
          user: this.parseToken(response.token),
           token: response.token })));
  }
  
   private parseToken(token: string): AuthUser {
    localStorage.setItem('token',token)
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return { id: decodedToken.sub,
      email: '' , roles: decodedToken.ROLES };
  }
    parseRoles(token: any): string[]  {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.ROLES;
  }
}