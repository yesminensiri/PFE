import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngFor et *ngIf
import { FormsModule } from '@angular/forms';  // Si tu utilises ngModel dans tes formulaires

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, // Ce module contient le pipe 'currency'
    ReactiveFormsModule
  ],
  // ... autres configurations
})
export class AppModule { }
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


// Depuis auth.module.ts (dossier auth/)
import { LoginComponent } from './login/login.component'; // ✅ Correct
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    ReactiveFormsModule
,
    CommonModule,     // Tu as besoin de CommonModule pour les directives de base comme *ngFor, *ngIf
    FormsModule,      // Si tu utilises ngModel dans tes formulaires
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ]
})
export class AuthModule { }
