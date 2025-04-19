// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone:false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });

    if (this.authService.isAuthenticated()) {
      this.redirectByRole();
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const isLoggedIn = this.authService.login(this.email, this.password);
    
    if (isLoggedIn) {
      const user = this.authService.getCurrentUser();
      if (user) {
        if (user.role === 'company') {
          this.router.navigate(['/entreprise/dashboard']);
        } else if (user.role === 'student') {
          this.router.navigate(['/etudiant/dashboard']);
        } else if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        }
      }
    } else {
      this.errorMessage = 'Identifiants incorrects.';
    }
  }

  private redirectByRole(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
  
    const routes = {
      student: '/etudiant/dashboard', // Redirection vers le tableau de bord de l'étudiant
      company: '/entreprise/dashboard', // Redirection vers le tableau de bord de l'entreprise
      admin: '/admin-dashboard' // Redirection vers le tableau de bord de l'administrateur
    };
  
    this.router.navigate([routes[user.role as keyof typeof routes]]);
  }
}