import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FavoritesComponent implements OnInit {
  favorites: Offer[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.offerService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.favorites = offers.filter(offer => offer.isFavorite);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des favoris:', error);
        this.errorMessage = 'Impossible de charger vos favoris. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  removeFavorite(offer: Offer): void {
    this.offerService.toggleFavorite(offer.id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.id !== offer.id);
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression du favori:', error);
      }
    });
  }

 // Assurer que l'interface Offer utilise number pour les IDs
viewOfferDetails(id: number): void {
  this.router.navigate(['/etudiant/offers', id]);
}

  applyToOffer(offer: Offer): void {
    if (offer.availability.toLowerCase() !== 'saturée') {
      this.router.navigate(['/etudiant/offres', offer.id, 'postuler']);
    }
  }

  getAvailabilityClass(availability: string): string {
    switch (availability.toLowerCase()) {
      case 'disponible':
        return 'available';
      case 'bientôt disponible':
        return 'coming-soon';
      case 'saturé':
        return 'saturated';
      default:
        return '';
    }
  }
}
