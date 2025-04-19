import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/dashboard';  // Remplacez avec l'URL de ton backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les statistiques du tableau de bord
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);  // Exemple d'URL d'API, adapte-la à ton backend
  }
}
