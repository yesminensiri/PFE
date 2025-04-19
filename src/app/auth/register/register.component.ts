import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';
  roles = ['student', 'company'];
  selectedPack: string | null = null;
  role: string = 'student';
  secondaryEmail: string = '';
  companyName: string = '';
  cvFile: File | null = null;
  profileImage: File | null = null;

  tunisianUniversities = [
    'Université de Tunis El Manar', 'Université de la Manouba', 'Université de Sfax', 'Université de Carthage',
    'Université de Monastir', 'Université de Sousse', 'Université de Kairouan', 'Université de Gabès'
  ];

  computerScienceDomains = [
    'Informatique générale', 'IoT', 'Intelligence Artificielle', 'Télécommunications', 'Développement web',
    'Cybersécurité', 'Data Science', 'Big Data', 'Blockchain'
  ];

  tunisianGovernorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Bizerte', 'Nabeul', 'Zaghouan', 'Kasserine', 'Kairouan',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Gabès', 'Mednine', 'Tozeur', 'Tataouine', 'Gafsa', 'Jendouba',
    'Kef', 'Siliana', 'Beja', 'Medenine', 'La Manouba', 'Sidi Bouzid'
  ];

  companySectors = [
    'Informatique', 'Télécommunications', 'Énergie', 'Industrie', 'Santé', 'Banque et Finance',
    'Marketing et Publicité', 'Commerce', 'Logistique', 'Éducation'
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', Validators.required],
      age: [null],
      birthDate: [''],
      sex: [''],
      university: [''],
      domain: [''],
      diplomas: [''],
      address: [''],
      phoneNumber: [''],
      secondaryEmail: [''],
      companyName: [''],
      companyLocation: [''],
      companyAge: [null],
      companyDomain: [''],
      companyPhone: [''],
      companyEmail: [''],
      companyAddress: ['']
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { selectedPack?: string };
    if (state?.selectedPack) {
      this.selectedPack = state.selectedPack;
    }
  }

  ngOnInit(): void {
    // Set role-specific validators
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.role = role;
      if (role === 'company') {
        this.registerForm.get('companyName')?.setValidators([Validators.required]);
        this.registerForm.get('companyLocation')?.setValidators([Validators.required]);
        this.registerForm.get('companyDomain')?.setValidators([Validators.required]);
        this.registerForm.get('companyPhone')?.setValidators([Validators.required]);
        this.registerForm.get('companyEmail')?.setValidators([Validators.required, Validators.email]);
        this.registerForm.get('companyAddress')?.setValidators([Validators.required]);
        
        // Clear student validators
        ['university', 'domain', 'age', 'birthDate', 'sex', 'diplomas'].forEach(field => {
          this.registerForm.get(field)?.clearValidators();
          this.registerForm.get(field)?.updateValueAndValidity();
        });
      } else if (role === 'student') {
        this.registerForm.get('university')?.setValidators([Validators.required]);
        this.registerForm.get('domain')?.setValidators([Validators.required]);
        this.registerForm.get('age')?.setValidators([Validators.required]);
        this.registerForm.get('birthDate')?.setValidators([Validators.required]);
        this.registerForm.get('sex')?.setValidators([Validators.required]);
        this.registerForm.get('diplomas')?.setValidators([Validators.required]);
        
        // Clear company validators
        ['companyName', 'companyLocation', 'companyDomain', 'companyPhone', 'companyEmail', 'companyAddress'].forEach(field => {
          this.registerForm.get(field)?.clearValidators();
          this.registerForm.get(field)?.updateValueAndValidity();
        });
      }
    });
  }

  onFileChange(event: Event, isCv: boolean): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (isCv) {
        this.cvFile = input.files[0];
      } else {
        this.profileImage = input.files[0];
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.registerForm.value;
    const userData: Partial<User> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      isActive: true
    };

    if (formData.role === 'company') {
      Object.assign(userData, {
        companyName: formData.companyName,
        companyLocation: formData.companyLocation,
        companyDomain: formData.companyDomain,
        companyPhone: formData.companyPhone,
        companyEmail: formData.companyEmail,
        companyAddress: formData.companyAddress
      });
    } else if (formData.role === 'student') {
      Object.assign(userData, {
        age: formData.age,
        birthDate: formData.birthDate,
        sex: formData.sex,
        university: formData.university,
        domain: formData.domain,
        diplomas: formData.diplomas,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        secondaryEmail: formData.secondaryEmail
      });
    }

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: { message: string; }) => {
        this.error = error.message || 'An error occurred during registration';
        this.loading = false;
      }
    });
  }

  goToPackSelection(): void {
    this.router.navigate(['/pack-selection']);
  }
}

