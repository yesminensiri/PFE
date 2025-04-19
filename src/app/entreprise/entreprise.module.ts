import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepriseRoutingModule } from './entreprise-routing.module'; // à ajouter
import { CompanyHomeComponent } from './company-home/company-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ManageOffersComponent } from './manage-offers/manage-offers.component';
import { ProfileComponent } from './profile/profile.component';
import { PackSelectionComponent } from './pack-selection/pack-selection.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CompanyHomeComponent,
    DashboardComponent,
    ManageApplicationsComponent,
    ManageOffersComponent,
    ProfileComponent,
    PackSelectionComponent,
    PaymentComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    EntrepriseRoutingModule
  ]
})
export class EntrepriseModule { }
