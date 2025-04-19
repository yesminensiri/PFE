import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css'],
  standalone: false
})
export class CandidaturesComponent implements OnInit {
  candidatures = [
    { id: 1, offre: 'Développeur Frontend', state: 'accepté' },
    { id: 2, offre: 'Développeur Backend', state: 'refusé' },
    { id: 3, offre: 'Chef de projet', state: 'annulé' },
    { id: 4, offre: 'UI/UX Designer', state: 'en attente' },
    { id: 5, offre: 'Data Scientist', state: 'en attente' }
  ];

  constructor() { }

  ngOnInit(): void { }

  retirerCandidature(candidatureId: number): void {
    this.candidatures = this.candidatures.filter(c => c.id !== candidatureId);
  }

  getStateLabel(state: string): string {
    const stateLabels: {[key: string]: string} = {
      'accepté': 'Accepté',
      'refusé': 'Refusé',
      'annulé': 'Annulé',
      'en attente': 'En attente'
    };
    return stateLabels[state] || state;
  }
}