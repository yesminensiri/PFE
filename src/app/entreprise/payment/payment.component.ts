import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedPack: any = null;
  selectedPaymentMethod: string = 'creditCard'; // Valeur par défaut (Carte Bancaire)

  // Détails pour le paiement par carte bancaire
  cardDetails = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  };

  // Détails pour le paiement par carte Edinar
  edinarCardDetails = {
    cardNumber: ''
  };

  // Détails pour le paiement via PayPal
  paypalDetails = {
    email: ''
  };

  // Détails pour le paiement par virement bancaire
  bankTransferDetails = {
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    bic: 'ABCD1234'
  };

  // Liste des mois et années valides pour la date d'expiration
  months = [
    { name: '01 - Janvier', value: '01' }, { name: '02 - Février', value: '02' },
    { name: '03 - Mars', value: '03' }, { name: '04 - Avril', value: '04' },
    { name: '05 - Mai', value: '05' }, { name: '06 - Juin', value: '06' },
    { name: '07 - Juillet', value: '07' }, { name: '08 - Août', value: '08' },
    { name: '09 - Septembre', value: '09' }, { name: '10 - Octobre', value: '10' },
    { name: '11 - Novembre', value: '11' }, { name: '12 - Décembre', value: '12' }
  ];

  years: number[] = [];  // Explicitement typé comme un tableau de nombres
  currentYear = new Date().getFullYear();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Générer une liste d'années disponibles (par exemple, 5 années à partir de l'année actuelle)
    for (let i = 0; i < 5; i++) {
      this.years.push(this.currentYear + i);
    }

    // Récupérer les informations du pack sélectionné depuis l'état de la navigation précédente
    const selectedPack = history.state?.selectedPack;
    if (selectedPack) {
      this.selectedPack = selectedPack;
    } else {
      // Rediriger si aucun pack n'est sélectionné
      this.router.navigate(['/pack-selection']);
    }
  }

  // Validation du numéro de carte bancaire
  isCardNumberValid(cardNumber: string): boolean {
    const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Supprimer tous les espaces
    const regex = /^[0-9]{16}$/; // Vérifie si le numéro de carte est composé de 16 chiffres
    return regex.test(cleanedCardNumber);
  }

  // Validation de la date d'expiration
  isExpiryDateValid(): boolean {
    const { expiryMonth, expiryYear } = this.cardDetails;
    if (!expiryMonth || !expiryYear) return false;

    const expiryDate = new Date(`${expiryYear}-${expiryMonth}-01`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Réinitialisation de l'heure pour la comparaison de dates

    // Vérifier si la date d'expiration est dans le futur ou égale à aujourd'hui (avec mois et année comparés)
    return expiryDate >= currentDate;
  }

  // Validation du numéro de carte Edinar
  isEdinarCardNumberValid(cardNumber: string): boolean {
    const cleanedCardNumber = cardNumber.replace(/\s+/g, ''); // Supprimer tous les espaces
    const regex = /^[0-9]{16}$/; // Vérifie si le numéro de carte est composé de 16 chiffres
    return regex.test(cleanedCardNumber);
  }

  // Cette méthode est appelée lorsque l'utilisateur clique sur "Payer"
  pay(): void {
    // Validation des informations selon la méthode de paiement sélectionnée
    if (this.selectedPaymentMethod === 'creditCard') {
      if (!this.cardDetails.cardNumber || !this.cardDetails.expiryMonth || !this.cardDetails.expiryYear || !this.cardDetails.cvv) {
        alert('Veuillez remplir tous les champs de la carte bancaire.');
        return;
      }
      if (!this.isCardNumberValid(this.cardDetails.cardNumber)) {
        alert('Le numéro de carte est invalide.');
        return;
      }
      if (!this.isExpiryDateValid()) {
        alert('La date d\'expiration de la carte est invalide ou dans le passé.');
        return;
      }
      console.log('Paiement par carte bancaire');
      console.log('Numéro de carte:', this.cardDetails.cardNumber);
      console.log('Date d\'expiration:', `${this.cardDetails.expiryMonth}/${this.cardDetails.expiryYear}`);
      console.log('CVV:', this.cardDetails.cvv);
    }

    if (this.selectedPaymentMethod === 'edinar') {
      if (!this.isEdinarCardNumberValid(this.edinarCardDetails.cardNumber)) {
        alert('Le numéro de carte Edinar est invalide. Il doit comporter 16 chiffres.');
        return;
      }
    }

    if (this.selectedPaymentMethod === 'paypal') {
      const paypalRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!paypalRegex.test(this.paypalDetails.email)) {
        alert('Veuillez entrer un email PayPal valide.');
        return;
      }
    }

    // Si toutes les validations sont passées, le paiement est effectué
    alert('Paiement effectué avec succès!');
    
    // Redirection vers la page d'inscription entreprise
    this.router.navigate(['/register']);
  }
}
