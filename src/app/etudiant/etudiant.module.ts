import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { OffersComponent } from './offers/offers.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { CareerAdviceComponent } from './career-advice/career-advice.component';import { StudentDashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    StudentHomeComponent,
    CareerAdviceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EtudiantRoutingModule,
    OffersComponent,
    FavoritesComponent,
    StudentDashboardComponent,
    OfferDetailsComponent,
    ProfileComponent
  ]
})
export class EtudiantModule { }
