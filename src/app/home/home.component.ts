import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string = '';  // Valeur par défaut

  internshipOffers = [
    { id: 1, title: 'Stage Développeur Web', company: 'Tech Co.', location: 'Paris', description: 'Rejoignez notre équipe de développement.', duration: '6 mois' },
    { id: 2, title: 'Stage Data Scientist', company: 'Data Corp', location: 'Lyon', description: 'Travaillez avec de grandes données et apprenez des techniques avancées.', duration: '6 mois' },
    { id: 3, title: 'Stage Marketing Digital', company: 'Market Solutions', location: 'Marseille', description: 'Aidez-nous à améliorer notre stratégie de marketing en ligne.', duration: '3 mois' }
  ];

  jobOffers = [
    { id: 1, title: 'Développeur Fullstack', company: 'Innovatech', location: 'Paris', description: 'Développement de solutions logicielles.', salary: '45k€/an' },
    { id: 2, title: 'Chef de Projet IT', company: 'Tech Vision', location: 'Lyon', description: 'Gestion des projets techniques.', salary: '55k€/an' },
    { id: 3, title: 'Ingénieur Cloud', company: 'CloudWorks', location: 'Marseille', description: 'Mise en place d’infrastructures Cloud.', salary: '60k€/an' }
  ];

  testimonials = [
    { 
      name: 'Malek Annabi', 
      role: 'Étudiante en Design', 
      message: 'Après plusieurs recherches infructueuses, j’ai trouvé un stage d’été en design grâce à cette plateforme. L’opportunité m’a permis de me former dans un domaine que j’adore et de gagner en compétences pratiques dans une entreprise innovante. Une expérience formatrice qui a enrichi mon parcours !' 
    },
    { 
      name: 'Ahmed Ben Ali', 
      role: 'Étudiant en Ingénierie', 
      message: 'La recherche de mon stage PFE m’a rendu très nerveux, car c’était crucial pour mon futur professionnel. Mais grâce à cette plateforme, j’ai non seulement trouvé un stage, mais j’ai aussi réussi à obtenir une mention très bien grâce à la qualité de l\'accompagnement et des opportunités proposées. Une expérience inoubliable qui a largement dépassé mes attentes !' 
    },
    { 
      name: 'Fedi Alwi', 
      role: 'Professionnel', 
      message: 'Après plusieurs années dans une entreprise où je me sentais insatisfait, j’ai décidé de changer d’orientation professionnelle. En rejoignant une nouvelle société via cette plateforme, je suis maintenant plus épanoui dans mon travail, avec des conditions et des défis bien plus en adéquation avec mes attentes. Je n’aurais pas pu faire ce saut sans cette plateforme qui m’a ouvert des portes.' 
    },
    { 
      name: 'Nadia Khaled', 
      role: 'Recruteur chez Tech Solutions', 
      message: 'J’ai publié mes offres d’emploi sur cette plateforme et, en quelques jours seulement, j’ai reçu une multitude de candidatures qualifiées. C’est un outil indispensable pour trouver des talents en un temps record, tout en accédant à des profils de grande qualité. C’est exactement ce dont nous avions besoin pour renforcer notre équipe.' 
    }
  ];

  faqs = [
    { question: 'Comment postuler à une offre ?', answer: 'Cliquez sur l\'offre qui vous intéresse et suivez les instructions.' },
    { question: 'Comment publier une offre ?', answer: 'Connectez-vous en tant qu\'entreprise, puis cliquez sur "Publier une Offre" dans votre dashboard.' },
    { question: 'Comment choisir le type d\'abonnement adapté à mon entreprise ?', answer: 'Consultez notre page "Abonnements" pour comparer les différentes formules selon vos besoins de recrutement.' },
    { question: 'Quels sont les avantages des packs Premium ?', answer: 'Visibilité renforcée, nombre illimité d\'offres, et accompagnement personnalisé dans vos campagnes de recrutement.' }
  ];

  // Suivi des états d'ouverture de chaque question
  faqStates: boolean[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.faqStates = new Array(this.faqs.length).fill(false);
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userRole = currentUser.role;
    }

    // Initialiser les états de chaque question à "fermé"
    this.initializeFaqStates();
  }
  private initializeFaqStates(): void {
    this.faqStates = this.faqs.map(() => false);
  }

  toggleFaq(index: number): void {
    if (index >= 0 && index < this.faqStates.length) {
      this.faqStates[index] = !this.faqStates[index];
    }}

  navigateToOffer(type: string, id: number): void {
    this.router.navigate([`/${type}/offer/${id}`]);
  }

 // home.component.ts
// Dans home.component.ts
navigateToCareerAdvice(): void {
  this.router.navigate(['/etudiant/career-advice']);
}

  navigateToPublishOffer(): void {
    this.router.navigate(['/company/publish-offer']);
  }

  navigateToStudentAdvice(): void {
    this.router.navigate(['/student-advices']); // Adapte ce chemin à ta route réelle
  }
}
