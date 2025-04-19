import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  standalone: false,
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit {
  studentName: string = 'Étudiant'; // This should be replaced with actual user data
  applicationsCount: number = 0;
  favoritesCount: number = 0;
  messagesCount: number = 0;

  recentApplications = [
    {
      id: 1,
      position: 'Développeur Full Stack',
      company: 'TechCorp',
      status: 'pending',
      date: '15/04/2024',
      location: 'Paris'
    },
    {
      id: 2,
      position: 'Data Analyst',
      company: 'DataSolutions',
      status: 'accepted',
      date: '10/04/2024',
      location: 'Lyon'
    }
  ];

  recommendedOffers = [
    {
      id: 1,
      title: 'Stage Développeur Frontend',
      company: 'WebTech',
      type: 'Stage',
      location: 'Paris',
      duration: '6 mois',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Alternance DevOps',
      company: 'CloudSystems',
      type: 'Alternance',
      location: 'Lille',
      duration: '12 mois',
      isFavorite: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize with mock data for now
    this.applicationsCount = this.recentApplications.length;
    this.favoritesCount = this.recommendedOffers.filter(offer => offer.isFavorite).length;
    this.messagesCount = 3; // Mock data
  }

  viewApplicationDetails(applicationId: number): void {
    // Navigate to application details
    console.log('Viewing application details for:', applicationId);
  }

  applyToOffer(offerId: number): void {
    // Handle application to offer
    console.log('Applying to offer:', offerId);
  }

  toggleFavorite(offerId: number): void {
    const offer = this.recommendedOffers.find(o => o.id === offerId);
    if (offer) {
      offer.isFavorite = !offer.isFavorite;
      this.favoritesCount = this.recommendedOffers.filter(o => o.isFavorite).length;
    }
  }
}
