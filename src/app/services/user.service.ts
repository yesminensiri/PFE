// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProfile(id: string, profileData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/profile`, profileData);
  }

  uploadProfilePicture(id: string, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('picture', file);
    return this.http.post<User>(`${this.apiUrl}/${id}/profile-picture`, formData);
  }
}