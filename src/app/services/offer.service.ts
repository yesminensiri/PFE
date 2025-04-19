import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Offer } from '../models/offer.model'; // Chemin relatif correct

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient) {}

  getOffers(): Observable<Offer[]> {
    // For now, return mock data
    return of([
      {
        id: 1,
        title: 'Stage en Développement Web',
        description: 'Stage de 6 mois en développement web full-stack',
        companyId: 1,
        companyName: 'Tech Solutions',
        companyLogo: 'assets/images/company1.png',
        location: 'Tunis',
        type: 'Stage',
        domain: 'Développement Web',
        availability: 'Disponible',
        skills: ['JavaScript', 'Angular', 'Node.js'],
        date: new Date(),
        duration: '6 mois', // Toujours fournir cette propriété
        isFavorite: false
      },
      {
        id: 2,
        title: 'Alternance en Data Science',
        description: 'Alternance en data science et machine learning',
        companyId: 2,
        companyName: 'Data Corp',
        companyLogo: 'assets/images/company2.png',
        location: 'Sousse',
        type: 'Alternance',
        domain: 'Data Science',
        availability: 'Bientôt disponible',
        skills: ['Python', 'SQL', 'Machine Learning'],
        date: new Date(),
        duration: '3 mois', // Toujours fournir cette propriété

        isFavorite: false
      }
    ]);
  }

  // offer.service.ts
getOfferById(id: number): Observable<Offer> {
  return this.http.get<Offer>(`${this.apiUrl}/${id}`).pipe(
    map(offer => ({
      ...offer,
      duration: offer.duration || 'Non spécifiée' // Valeur par défaut
    }))
  );
}

  createOffer(offer: Partial<Offer>): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

  updateOffer(id: number, offer: Partial<Offer>): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/${id}`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOffersByCompany(companyId: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/company/${companyId}`);
  }

  toggleOfferStatus(id: number, status: 'active' | 'inactive'): Observable<Offer> {
    return this.http.patch<Offer>(`${this.apiUrl}/${id}/status`, { status });
  }

  toggleFavorite(offerId: number): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/${offerId}/favorite`, {});
  }
} 