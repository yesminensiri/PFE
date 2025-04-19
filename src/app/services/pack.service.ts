import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pack } from '../entities/pack.model'; // Import correct

@Injectable({
  providedIn: 'root'
})
export class PackService {
  private apiUrl = `${environment.apiBaseUrl}/packs`;
  private cache$?: Observable<Pack[]>;

  constructor(private http: HttpClient) {}

  getPacks(): Observable<Pack[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<Pack[]>(this.apiUrl).pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }
}