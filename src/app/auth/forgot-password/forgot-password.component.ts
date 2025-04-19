import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

    email: string = '';
  
    onSubmit(): void {
      if (this.email) {
        alert(`Un lien de réinitialisation a été envoyé à ${this.email}`);
        // Ici, tu pourrais appeler un service réel pour envoyer l'e-mail
      } else {
        alert('Veuillez saisir une adresse e-mail valide.');
      }
    }
  }
