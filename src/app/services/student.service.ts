import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Déclare l'interface pour le profil de l'étudiant
export interface Student {
  name: string;
  email: string;
  cv: string;
  coverLetter: string;
}

@Injectable({
  providedIn: 'root'  // Cela rend le service disponible dans toute l'application
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/student';  // Change l'URL selon ton backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer le profil de l'étudiant
  getStudentProfile(): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/profile`);
  }

  // Méthode pour mettre à jour le profil de l'étudiant
  updateProfile(student: Student): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, student);
  }
}
