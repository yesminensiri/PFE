import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PackSelectionComponent } from './entreprise/pack-selection/pack-selection.component';
// Home
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './entreprise/payment/payment.component';
// Étudiant

// Entreprise
import { ManageOffersComponent } from './entreprise/manage-offers/manage-offers.component';
import { ManageApplicationsComponent } from './entreprise/manage-applications/manage-applications.component';
import { DashboardComponent } from './entreprise/dashboard/dashboard.component';
import { ProfileComponent } from './entreprise/profile/profile.component';

// Admin
import { DashboardComponent as AdminDashboard } from './admin/dashboard/dashboard.component';
// Autres
import { CandidaturesComponent } from './candidatures/candidatures.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

// Guard
import { AuthGuard } from './auth/auth.guard';
import { CompanyHomeComponent } from './entreprise/company-home/company-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'pack-selection', component: PackSelectionComponent },

  // Candidatures
  { path: 'candidatures', component: CandidaturesComponent },
  { path: 'payment', component: PaymentComponent },
  
  {
    path: 'etudiant',
    canActivate: [AuthGuard], // Déplacer le guard ici
    data: { roles: ['student'] },
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule), // Lazy load EtudiantModule
  },

  {
    path: 'entreprise',
    canActivate: [AuthGuard],
    data: { roles: ['company'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-offers', component: ManageOffersComponent },
      { path: 'manage-applications', component: ManageApplicationsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'pack-selection', component: PackSelectionComponent },
      { path: 'payment', component: PaymentComponent }
    ],
  },

  // Admin
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },

  // Autres
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Redirect to home for unknown routes
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
