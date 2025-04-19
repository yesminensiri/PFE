// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,  // Tu as mentionné que tu ne veux pas utiliser de modules standalone, donc cela reste comme ça
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Correction ici: "styleUrls" avec un "s"
})
export class DashboardComponent {
  // Tu peux ajouter ta logique ici
}
