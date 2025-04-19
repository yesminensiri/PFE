import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service'; // Chemin corrigé
import { Offer } from '../../models/offer.model'; // Chemin relatif correct

@Component({
  selector: 'app-offer-details',
  standalone: true,
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
  imports: [CommonModule,FormsModule]
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer | null = null;
  offerId: number | null = null; // Changé en number
  isLoading = true;
  error: string | null = null;
  currentTab: string = 'details';
  comment: string = '';
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      
      if (idParam) {
        this.offerId = parseInt(idParam, 10);
      }
      
      if (!this.offerId || isNaN(this.offerId)) {
        this.error = "ID d'offre invalide.";
        this.isLoading = false;
        return;
      }

      this.loadOfferDetails();
    });
  }
  

  private loadOfferDetails(): void {
    this.isLoading = true;
    this.error = null;

    if (!this.offerId) return;

    this.offerService.getOfferById(this.offerId).subscribe({
      next: (offer: Offer) => {
        this.offer = {
          ...offer,
          duration: offer.duration || 'Non spécifiée'
        };
        this.isFavorite = offer.isFavorite;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = "Erreur lors du chargement de l'offre.";
        this.isLoading = false;
        console.error('Error loading offer:', err);
      }
    });
  }

  setTab(tab: string): void {
    this.currentTab = tab;
  }

  getAvailabilityClass(status: string | undefined): string {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'disponible':
        return 'available';
      case 'saturée':
        return 'saturated';
      case 'bientôt disponible':
        return 'coming-soon';
      default:
        return '';
    }
  }
  toggleFavorite(): void {
    if (this.offer && this.offerId) {
      this.isFavorite = !this.isFavorite;
      this.offerService.toggleFavorite(this.offerId).subscribe({
        next: () => {
          if (this.offer) this.offer.isFavorite = this.isFavorite;
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.isFavorite = !this.isFavorite;
        }
      });
    }
  }
  applyForOffer(): void {
    if (this.offer) {
      console.log('Applying for offer:', this.offer.id);
    }
  }
  shareOffer(): void {
    if (this.offer) {
      const shareText = `Découvrez cette offre : ${this.offer.title}`;
      if (navigator.share) {
        navigator.share({
          title: 'Offre de stage',
          text: shareText,
          url: window.location.href
        }).then(() => {
          console.log('Offre partagée avec succès');
        }).catch(err => {
          console.error('Erreur de partage :', err);
        });
      } else {
        console.log('Fonction de partage non supportée dans ce navigateur.');
      }
    }
  }

  submitComment(): void {
    if (this.comment.trim() && this.offer) {
      console.log('Submitting comment:', this.comment);
      this.comment = '';
    }
  }
  goBack(): void {
    this.router.navigate(['/etudiant/offers']);
  }}
