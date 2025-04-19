import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentDashboardComponent } from './dashboard/dashboard.component';
import { OffersComponent } from './offers/offers.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { CareerAdviceComponent } from './career-advice/career-advice.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'offer-details/:id', component: OfferDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'student-home', component: StudentHomeComponent },
      { path: 'career-advice', component: CareerAdviceComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }