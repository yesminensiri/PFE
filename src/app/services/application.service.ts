import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../entities/user.model';
import { Offer } from './offer.service';

export interface Application {
  id: string;
  studentId: string;
  offerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  offer?: Offer;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = `${environment.apiBaseUrl}/applications`;

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getApplicationById(id: string): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  createApplication(application: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplication(id: string, application: Partial<Application>): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, application);
  }

  deleteApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationsByStudent(studentId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getApplicationsByOffer(offerId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/offer/${offerId}`);
  }

  updateApplicationStatus(id: string, status: 'pending' | 'accepted' | 'rejected'): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}/status`, { status });
  }
} 