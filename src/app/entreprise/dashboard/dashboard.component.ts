import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  stats = {
    internships: 124,
    jobs: 89,
    newEmployees: 15,
    visitors: 1240,
    progress: 65,
    target: {
      achieved: 32,
      total: 50
    }
  };

  // Dernières candidatures
  recentApplications = [
    {
      name: 'Jean Dupont',
      position: 'Stage Développeur Web',
      date: 'Aujourd\'hui, 10:30',
      status: 'new',
      avatar: 'assets/user-avatar1.jpg'
    },
    {
      name: 'Marie Lambert',
      position: 'Ingénieur Logiciel',
      date: 'Hier, 14:45',
      status: 'reviewed',
      avatar: 'assets/user-avatar2.jpg'
    }
  ];

  // Compétences recherchées
  topSkills = [
    { name: 'JavaScript', percentage: 80 },
    { name: 'React', percentage: 65 },
    { name: 'Node.js', percentage: 45 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('DashboardComponent entreprise chargé !');
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  private initCharts() {
    // Graphique principal
    new Chart('mainChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Candidatures Stages',
            data: [65, 59, 80, 81, 56, 55, 40, 72, 85, 91, 74, 63],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Candidatures Emplois',
            data: [28, 48, 40, 19, 86, 27, 90, 55, 42, 33, 51, 77],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Mini graphiques
    this.createMiniChart('internshipChart', [65, 59, 80, 81, 56], '#3498db');
    this.createMiniChart('jobChart', [28, 48, 40, 19, 86], '#2ecc71');
    this.createMiniChart('employeesChart', [12, 15, 8, 10, 7], '#e74c3c');
    this.createMiniChart('visitorsChart', [120, 140, 160, 180, 200], '#9b59b6');
  }

  private createMiniChart(id: string, data: number[], color: string) {
    new Chart(id, {
      type: 'line',
      data: {
        labels: ['', '', '', '', ''],
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }

  // Méthodes de navigation existantes (conservées telles quelles)
  goToProfile() {
    this.router.navigate(['/company-home/profile']);
  }

  goToOffers() {
    this.router.navigate(['/entreprise/manage-offers']);
  }

  goToManageApplications(): void {
    this.router.navigate(['/entreprise/manage-applications']);
  }

  goToPackSelection() {
    this.router.navigate(['/company-home/pack-selection']);
  }

  goToPayment() {
    this.router.navigate(['/company-home/payment']);
  }

  // Méthode pour formater les grands nombres
  formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}