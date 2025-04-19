import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditing = false;

  profile = {
    companyName: 'Tech Innovators',
    email: 'contact@techinnov.com',
    phone: '+216 12 345 678',
    description: 'Société spécialisée dans les technologies innovantes.',
    address: 'Tunis, Tunisie',
    password: '',
    sector: 'Technologies de l’information',
    contactPerson: 'Amira Ben Ali',
    pfeBook: 'https://example.com/pfe-book.pdf'
  };

  editedProfile = { ...this.profile };

  startEdit() {
    this.isEditing = true;
    this.editedProfile = { ...this.profile };
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    this.profile = { ...this.editedProfile };
    this.isEditing = false;
  }
}
