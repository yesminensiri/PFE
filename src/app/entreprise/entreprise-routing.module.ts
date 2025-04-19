import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageOffersComponent } from './manage-offers/manage-offers.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ProfileComponent } from './profile/profile.component';
import { PackSelectionComponent } from './pack-selection/pack-selection.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'manage-offers', component: ManageOffersComponent },
      { path: 'entreprise/manage-applications', component: ManageApplicationsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'pack-selection', component: PackSelectionComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'payment', component: PaymentComponent },
      {path:'companyhome',component:CompanyHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // ou RouterModule.forRoot(routes) si tu utilises le root module
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
