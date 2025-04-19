import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../entities/user.model';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: false
})
export class StudentDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('offersChart', { static: false }) offersChartRef!: ElementRef;
  @ViewChild('responsesChart', { static: false }) responsesChartRef!: ElementRef;

  currentUser: User | null = null;
  loading = true;
  error = '';
  
  // Statistics
  studentStats = {
    offersApplied: 0,
    acceptedOffers: 0,
    rejectedOffers: 0,
    favoritesCount: 0,
    profileCompleteness: 0
  };
  
  // Recent activities
  recentActivities = [
    { type: 'application', title: 'Stage développeur web', company: 'TechCorp', date: new Date(), status: 'En attente' },
    { type: 'view', title: 'Stage Data Scientist', company: 'DataTech', date: new Date(), status: 'Vu' }
  ];

  // Recommended internships
  recommendedInternships = [
    {
      title: 'Stage Développeur Full Stack',
      company: 'WebSolutions',
      location: 'Tunis',
      duration: '6 mois',
      technologies: ['Angular', 'Node.js', 'MongoDB']
    },
    {
      title: 'Stage en IA',
      company: 'AITech',
      location: 'Sfax',
      duration: '3 mois',
      technologies: ['Python', 'TensorFlow', 'OpenCV']
    }
  ];

  private offersChart?: Chart;
  private responsesChart?: Chart;

  constructor(private authService: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardStats();
  }

  ngAfterViewInit(): void {
    if (!this.loading) {
      this.initCharts();
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  private loadUserData(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loading = false;
    
    if (!this.currentUser) {
      this.error = 'Utilisateur non connecté';
    }
  }

  private loadDashboardStats(): void {
    // TODO: Implement actual API calls
    this.studentStats = {
      offersApplied: 5,
      acceptedOffers: 2,
      rejectedOffers: 1,
      favoritesCount: 3,
      profileCompleteness: 85
    };
  }

  private initCharts(): void {
    if (!this.offersChartRef?.nativeElement || !this.responsesChartRef?.nativeElement) {
      return;
    }

    this.destroyCharts();
    this.createOffersChart();
    this.createResponsesChart();
  }

  private createOffersChart(): void {
    this.offersChart = new Chart(this.offersChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Offres Candidaturées', 'Offres Acceptées', 'Offres Refusées'],
        datasets: [{
          label: 'Statistiques des candidatures',
          data: [
            this.studentStats.offersApplied,
            this.studentStats.acceptedOffers,
            this.studentStats.rejectedOffers
          ],
          backgroundColor: ['#007BFF', '#28a745', '#dc3545'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  private createResponsesChart(): void {
    this.responsesChart = new Chart(this.responsesChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Acceptées', 'Refusées', 'En attente'],
        datasets: [{
          label: 'Réponses aux offres',
          data: [
            this.studentStats.acceptedOffers,
            this.studentStats.rejectedOffers,
            this.studentStats.offersApplied - this.studentStats.acceptedOffers - this.studentStats.rejectedOffers
          ],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
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

  viewInternshipDetails(internship: any): void {
    // TODO: Implement navigation to internship details
    console.log('Viewing internship:', internship);
  }

  applyForInternship(internship: any): void {
    // TODO: Implement application logic
    console.log('Applying for internship:', internship);
  }

  saveInternship(internship: any): void {
    // TODO: Implement save logic
    console.log('Saving internship:', internship);
  }

  updateProfile(): void {
    // TODO: Implement profile update navigation
    console.log('Navigating to profile update');
  }
} 