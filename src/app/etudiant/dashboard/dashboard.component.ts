import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../entities/user.model';

Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('offersChart') offersChartRef!: ElementRef;
  @ViewChild('responsesChart') responsesChartRef!: ElementRef;

  currentUser: User | null = null;
  isLoading = true;
  errorMessage = '';
  studentName = '';

  studentStats = {
    offersApplied: 0,
    acceptedOffers: 0,
    rejectedOffers: 0,
    favoritesCount: 0,
    profileCompleteness: 75
  };

  recentActivity: any[] = [
    { type: 'application', title: 'Stage Développeur Full Stack', company: 'Tech Corp', date: new Date(), status: 'pending' },
    { type: 'view', title: 'Stage Data Science', company: 'AI Solutions', date: new Date(), status: 'viewed' }
  ];

  recommendedInternships: any[] = [
    {
      title: 'Stage Développeur Frontend',
      company: 'Web Solutions',
      location: 'Paris',
      duration: '6 mois',
      technologies: ['Angular', 'React', 'TypeScript']
    },
    {
      title: 'Stage Backend Developer',
      company: 'Cloud Services',
      location: 'Lyon',
      duration: '4 mois',
      technologies: ['Node.js', 'Python', 'MongoDB']
    }
  ];

  private offersChart: Chart | null = null;
  private responsesChart: Chart | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardStats();
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  navigateTo(route: string): void {
    this.router.navigate(['/etudiant', route]);
  }

  private loadUserData(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.errorMessage = 'Vous devez être connecté pour voir cette page';
      this.isLoading = false;
    } else {
      this.studentName = this.currentUser.firstName || 'Étudiant';
    }
  }

  private loadDashboardStats(): void {
    // TODO: Replace with actual API calls
    this.studentStats = {
      offersApplied: 15,
      acceptedOffers: 3,
      rejectedOffers: 2,
      favoritesCount: 8,
      profileCompleteness: 75
    };
    this.isLoading = false;
  }

  private initializeCharts(): void {
    this.createOffersChart();
    this.createResponsesChart();
  }

  private createOffersChart(): void {
    const ctx = this.offersChartRef.nativeElement.getContext('2d');
    this.offersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Candidatures',
          data: [5, 8, 12, 15, 10, 7],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private createResponsesChart(): void {
    const ctx = this.responsesChartRef.nativeElement.getContext('2d');
    this.responsesChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Acceptées', 'En attente', 'Refusées'],
        datasets: [{
          data: [3, 5, 2],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private destroyCharts(): void {
    if (this.offersChart) {
      this.offersChart.destroy();
    }
    if (this.responsesChart) {
      this.responsesChart.destroy();
    }
  }
} 