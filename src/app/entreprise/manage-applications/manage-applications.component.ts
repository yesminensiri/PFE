import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface Application {
  id: number;
  studentName: string;
  offerTitle: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
  cvUrl: string;
  motivationLetter: string;
  email: string;
  phone?: string;
}
@Component({
  standalone:false,
  selector: 'app-manage-applications',
  templateUrl: './manage-applications.component.html',
  styleUrls: ['./manage-applications.component.css'],
  animations: [
    trigger('panelAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ManageApplicationsComponent implements OnInit {
  applications: Application[] = [];
  selectedApplication: Application | null = null;
  statusFilter: string = '';
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    // Simuler un appel API
    this.applications = [
      {
        id: 1,
        studentName: 'Ali Ben Salem',
        offerTitle: 'Développeur Web Angular',
        status: 'pending',
        cvUrl: 'https://example.com/cv1.pdf',
        motivationLetter: 'Je suis passionné par le développement web et j\'ai une solide expérience en Angular...',
        date: '2025-04-01',
        email: 'ali.bensalem@example.com',
        phone: '12345678'
      },
      {
        id: 2,
        studentName: 'Meriem Trabelsi',
        offerTitle: 'Designer UI/UX',
        status: 'accepted',
        cvUrl: 'https://example.com/cv2.pdf',
        motivationLetter: 'Mon objectif est de créer des expériences utilisateurs intuitives...',
        date: '2025-04-02',
        email:'meriem.trablesi@gmail.com',
        phone:'91455165',
      },
      {
        id: 3,
        studentName: 'Oussama Dali',
        offerTitle: 'Data Analyst',
        status: 'pending',
        cvUrl: 'https://example.com/cv3.pdf',
        motivationLetter: 'J’adore explorer les données et trouver des insights utiles...',
        date: '2025-04-03',
        email:'oussema.dali@gmail.com',
        phone:'20789654',
      },
      {
        id: 4,
        studentName: 'Leila Ayari',
        offerTitle: 'Marketing Digital',
        status: 'rejected',
        cvUrl: 'https://example.com/cv4.pdf',
        motivationLetter: 'Je suis motivée pour développer des stratégies marketing efficaces...',
        date: '2025-04-04',
        email:'leila.ayari123@gmail.com',
        phone:'28465712',
      },
      {
        id: 5,
        studentName: 'Youssef Ben Amor',
        offerTitle: 'Développeur Mobile Flutter',
        status: 'pending',
        cvUrl: 'https://example.com/cv5.pdf',
        motivationLetter: 'Le mobile est ma passion, je développe avec Flutter depuis 2 ans...',
        date: '2025-04-05',
        email:'youssefben.amor9@gmail.com',
        phone:'57410069',
      },
      {
        id: 6,
        studentName: 'Sarra Jlassi',
        offerTitle: 'Graphiste',
        status: 'pending',
        cvUrl: 'https://example.com/cv6.pdf',
        motivationLetter: 'Je maîtrise Photoshop, Illustrator, et j’adore la création visuelle...',
        date: '2025-04-06',
        email:'sarrajlassi54@gmail.com',
        phone:'50024677',
      },
      {
        id: 7,
        studentName: 'Houssem Kallel',
        offerTitle: 'Ingénieur DevOps',
        status: 'pending',
        cvUrl: 'https://example.com/cv7.pdf',
        motivationLetter: 'Je suis passionné par l’automatisation et l’intégration continue...',
        date: '2025-04-07',
        email:'houssemkallel1@gmail.com',
        phone:'98476898',
      },
      {
        id: 8,
        studentName: 'Amira Chouchene',
        offerTitle: 'Business Analyst',
        status: 'pending',
        cvUrl: 'https://example.com/cv8.pdf',
        motivationLetter: 'Analyser les besoins et proposer des solutions efficaces, c’est mon point fort...',
        date: '2025-04-08',
        email:'amirachouchene2@gmail.com',
        phone:'22144788',
      },
      {
        id: 9,
        studentName: 'Anis Feki',
        offerTitle: 'Développeur Fullstack',
        status: 'pending',
        cvUrl: 'https://example.com/cv9.pdf',
        motivationLetter: 'Je travaille aussi bien sur le frontend que le backend avec MERN Stack...',
        date: '2025-04-09',
        email:'anisfeki9@gmail.com',
        phone:'55329801',
      },
      {
        id: 10,
        studentName: 'Aya Hachicha',
        offerTitle: 'Community Manager',
        status: 'accepted',
        cvUrl: 'https://example.com/cv10.pdf',
        motivationLetter: 'Créer du contenu engageant pour les réseaux sociaux est ce que je préfère...',
        date: '2025-04-10',
        email:'ayahachicha52@gmail.com',
        phone:'54777888',
      },
      
    ];
  }
    
  

  filteredApplications(): Application[] {
    return this.applications.filter(app => {
      const matchesStatus = !this.statusFilter || app.status === this.statusFilter;
      const matchesSearch = !this.searchTerm || 
        app.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.offerTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  countByStatus(status: string): number {
    return this.applications.filter(app => app.status === status).length;
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'accepted': 'Acceptée',
      'rejected': 'Refusée'
    };
    return statusMap[status] || status;
  }

  viewDetails(app: Application): void {
    this.selectedApplication = app;
  }

  closeDetails(): void {
    this.selectedApplication = null;
  }

  acceptApplication(app: Application): void {
    app.status = 'accepted';
    // TODO: Implémenter l'appel API
  }

  rejectApplication(app: Application): void {
    app.status = 'rejected';
    // TODO: Implémenter l'appel API
  }

  resetFilters(): void {
    this.statusFilter = '';
    this.searchTerm = '';
  }

  exportApplications(): void {
    // TODO: Implémenter l'export CSV/Excel
    console.log('Export des candidatures');
  }

  sendEmail(application: Application): void {
    const subject = `Candidature pour ${application.offerTitle}`;
    const body = `Bonjour ${application.studentName},\n\n`;
    window.location.href = `mailto:${application.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  goBackToDashboard(): void {
    this.router.navigate(['/entreprise/dashboard']);
  }

  goToOfferManagement(): void {
    console.log('Attempting navigation to manage-offers');
    this.router.navigate(['/entreprise/manage-offers']).then(nav => {
      console.log('Navigation success:', nav);
    }, err => {
      console.error('Navigation failed:', err);
    });
  }
}