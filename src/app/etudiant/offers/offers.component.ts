import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';
  selectedType = '';
  selectedAvailability = '';
  selectedDomain = '';
  selectedLocation = '';
  viewMode: 'grid' | 'list' = 'grid';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 9;

  constructor(
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.offerService.getOffers().subscribe({
      next: (offers) => {
        this.offers = offers;
        this.filterOffers();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Une erreur est survenue lors du chargement des offres.';
        this.isLoading = false;
        console.error('Error loading offers:', error);
      }
    });
  }

  filterOffers(): void {
    let filtered = [...this.offers];
    
    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(offer => 
        offer.title.toLowerCase().includes(searchLower) ||
        offer.companyName.toLowerCase().includes(searchLower) ||
        offer.skills.some((skill: string) => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply type filter
    if (this.selectedType) {
      filtered = filtered.filter(offer => offer.type === this.selectedType);
    }
    
    // Apply availability filter
    if (this.selectedAvailability) {
      filtered = filtered.filter(offer => offer.availability === this.selectedAvailability);
    }
    
    // Apply domain filter
    if (this.selectedDomain) {
      filtered = filtered.filter(offer => offer.domain === this.selectedDomain);
    }
    
    // Apply location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(offer => offer.location === this.selectedLocation);
    }
    
    // Update pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1;
    
    // Apply pagination
    this.filteredOffers = this.paginateOffers(filtered);
  }

  paginateOffers(offers: Offer[]): Offer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return offers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterOffers();
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedAvailability = '';
    this.selectedDomain = '';
    this.selectedLocation = '';
    this.filterOffers();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  viewOfferDetails(id: number): void { // Garder en number
    this.router.navigate(['/etudiant/offers', id]);
  }

  toggleFavorite(offer: Offer): void {
    offer.isFavorite = !offer.isFavorite;
    this.offerService.toggleFavorite(offer.id).subscribe({
      error: (error) => {
        console.error('Error toggling favorite:', error);
        offer.isFavorite = !offer.isFavorite; // Revert on error
      }
    });
  }

  getAvailabilityClass(availability: string): string {
    switch (availability) {
      case 'Disponible':
        return 'available';
      case 'Bientôt disponible':
        return 'coming-soon';
      case 'Saturé':
        return 'saturated';
      default:
        return '';
    }
  }

  getUniqueCompanies(): number {
    const uniqueCompanies = new Set(this.offers.map(offer => offer.companyName));
    return uniqueCompanies.size;
  }

  getUniqueLocations(): string[] {
    const uniqueLocations = new Set(this.offers.map(offer => offer.location));
    return Array.from(uniqueLocations);
  }

  getUniqueDomains(): string[] {
    const uniqueDomains = new Set(this.offers.map(offer => offer.domain));
    return Array.from(uniqueDomains);
  }

  getFeaturedOffers(): Offer[] {
    // Return offers that are marked as favorites or have been recently added
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return this.offers.filter(offer => 
      offer.isFavorite || 
      (offer.date && new Date(offer.date) > oneWeekAgo)
    );
  }
} 