import { Component } from '@angular/core';

interface Offer {
  id: number;
  title: string;
  description: string;
  requiredSkills: string[];
  duration: string;
  availability: Date;
  domain: string;
  location: string;
  type: string; // e.g., Stage, CDI, etc.
}

@Component({
  standalone:false,
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent {
  offers: Offer[] = [
    {
      id: 1,
      title: 'Développeur Frontend',
      description: 'Développement d\'interfaces utilisateur avec Angular',
      requiredSkills: ['Angular', 'TypeScript', 'HTML/CSS'],
      duration: '6 mois',
      availability: new Date('2023-11-01'),
      domain: 'Développement Web',
      location: 'Tunis',
      type: 'Stage'
    },
    {
      id: 2,
      title: 'Data Analyst',
      description: 'Analyse de données et modélisation',
      requiredSkills: ['Python', 'Machine Learning', 'SQL'],
      duration: '1 an',
      availability: new Date('2023-12-01'),
      domain: 'Data Science',
      location: 'Remote',
      type: 'CDI'
    }];

  isEditing: boolean = false;
  offerForm: Offer = this.resetForm();
  skillInput = '';

  editOffer(offer: Offer) {
    this.isEditing = true;
    this.offerForm = { ...offer };
  }

  deleteOffer(id: number) {
    this.offers = this.offers.filter(o => o.id !== id);
  }

  saveOffer() {
    if (this.isEditing) {
      const index = this.offers.findIndex(o => o.id === this.offerForm.id);
      if (index !== -1) this.offers[index] = { ...this.offerForm };
    } else {
      const newId = Math.max(...this.offers.map(o => o.id), 0) + 1;
      this.offers.push({ ...this.offerForm, id: newId });
    }
    this.offerForm = this.resetForm();
    this.isEditing = false;
  }

  cancelEdit() {
    this.offerForm = this.resetForm();
    this.isEditing = false;
  }

  resetForm(): Offer {
    return {
      id: 0,
      title: '',
      description: '',
      requiredSkills: [],
      duration: '',
      availability: new Date(),
      domain: '',
      location: '',
      type: 'Stage'
    };
  }
  addSkill() {
    if (this.skillInput && !this.offerForm.requiredSkills.includes(this.skillInput)) {
      this.offerForm.requiredSkills.push(this.skillInput);
      this.skillInput = '';
    }
  }

  removeSkill(skill: string) {
    this.offerForm.requiredSkills = this.offerForm.requiredSkills.filter(s => s !== skill);
  }
}
