import { Component } from '@angular/core';

interface CareerResource {
  title: string;
  type: 'article' | 'video' | 'checklist';
  duration?: string;
  category: string;
  description: string;
  link: string;
}

@Component({
  standalone:false,
  selector: 'app-career-advice',
  templateUrl: './career-advice.component.html',
  styleUrls: ['./career-advice.component.css']
})
export class CareerAdviceComponent {
  featuredArticles = [
    {
      title: 'Maîtriser les entretiens techniques',
      category: 'Entretiens',
      duration: '15 min',
      description: 'Guide complet pour réussir les tests techniques et les whiteboard interviews',
      image: 'assets/images/interview-tech.jpg'
    },
    {
      title: 'Créer un CV qui attire les recruteurs',
      category: 'CV & Portfolio',
      duration: '10 min',
      description: 'Les meilleures pratiques pour structurer et présenter vos compétences',
      image: 'assets/images/cv-design.jpg'
    }
  ];

  videoTutorials = [
    {
      title: 'Simulation entretien comportemental',
      duration: '25:30',
      category: 'Mock Interview',
      thumbnail: 'assets/videos/thumb1.jpg'
    },
    {
      title: 'Negotiation salariale',
      duration: '18:45',
      category: 'Compensation',
      thumbnail: 'assets/videos/thumb2.jpg'
    }
  ];

  skillDevelopment = [
    { 
      name: 'LinkedIn Optimization', 
      progress: 65,
      steps: ['Profil complet', 'Mots-clés', 'Recommandations', 'Réseautage']
    },
    { 
      name: 'Networking', 
      progress: 40,
      steps: ['Elevator pitch', 'Contacts stratégiques', 'Follow-up']
    }
  ];

  expertTips = [
    {
      quote: "Un bon CV doit raconter une histoire cohérente en moins de 30 secondes",
      author: "Sophie Martin - Responsable RH Tech"
    },
    {
      quote: "Préparez toujours 3 questions pertinentes pour la fin d'un entretien",
      author: "Pierre Dubois - Tech Recruiter"
    }
  ];

  resources: CareerResource[] = [
    {
      title: 'Checklist pré-entretien',
      type: 'checklist',
      category: 'Préparation',
      description: 'Toutes les étapes à vérifier avant un entretien',
      link: '/downloads/checklist.pdf'
    },
    {
      title: 'Les erreurs à éviter en entretien vidéo',
      type: 'video',
      duration: '12 min',
      category: 'Vidéo',
      description: 'Conseils techniques et posturaux',
      link: '/video/45'
    }
  ];

  selectedCategory: string = 'all';

  navigateToArticle(articleId: string) {
    // Implémentez la navigation vers l'article détaillé
  }

  playVideo(videoId: string) {
    // Implémentez la lecture vidéo
  }

  downloadResource(resource: CareerResource) {
    // Implémentez le téléchargement
  }
}