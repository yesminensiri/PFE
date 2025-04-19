import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackService } from '../../services/pack.service';
import { Pack } from '../../entities/pack.model'; // Import correct

@Component({
  standalone:false,
  selector: 'app-pack-selection',
  templateUrl: './pack-selection.component.html',
  styleUrls: ['./pack-selection.component.css']
})
export class PackSelectionComponent implements OnInit {
  selectedPack: number | null = null;
  isLoading = true;
  packs: Pack[] = [];

  constructor(
    private router: Router,
    private packService: PackService
  ) {}

  ngOnInit(): void {
    this.loadPacks();
  }

  loadPacks(): void {
    this.packService.getPacks().subscribe({
      next: (data: Pack[]) => {
        this.packs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }

  onSelectPack(pack: Pack): void {
    this.selectedPack = pack.id;
    this.router.navigate(['/payment'], {
      state: { selectedPack: pack }
    });
  }
}