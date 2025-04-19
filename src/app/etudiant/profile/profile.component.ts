import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../entities/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileImage: string | null = null;
  profileCompleteness = 0;
  currentStep = 1;
  personalInfoForm: FormGroup;
  skillsList: string[] = [];
  languagesList: string[] = [];
  newSkill = '';
  newLanguage = '';
  cvFile: File | null = null;
  attachments: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.personalInfoForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      university: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]{8}$/)],
      cv: [null],
      attachments: [[]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.calculateProfileCompleteness();
  }

  loadUserData(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.personalInfoForm.patchValue({
        fullName: this.currentUser.firstName + ' ' + this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone
      });
      this.profileImage = this.currentUser.profileImage || null;
    }
  }

  calculateProfileCompleteness(): void {
    let completedFields = 0;
    let totalFields = 0;

    // Count form fields
    Object.keys(this.personalInfoForm.controls).forEach(key => {
      totalFields++;
      if (this.personalInfoForm.get(key)?.value) {
        completedFields++;
      }
    });

    // Count skills and languages
    totalFields += 2; // One for skills, one for languages
    if (this.skillsList.length > 0) completedFields++;
    if (this.languagesList.length > 0) completedFields++;

    // Count files
    totalFields += 2; // One for CV, one for attachments
    if (this.cvFile) completedFields++;
    if (this.attachments.length > 0) completedFields++;

    this.profileCompleteness = Math.round((completedFields / totalFields) * 100);
  }

  onAvatarChange(): void {
    // Implement file input for avatar change
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
          // Here you would typically upload the image to your server
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  setStep(step: number): void {
    this.currentStep = step;
  }

  skipStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  onFileChange(event: any, type: 'cv' | 'attachments'): void {
    const files = event.target.files;
    if (type === 'cv' && files.length > 0) {
      this.cvFile = files[0];
      this.personalInfoForm.patchValue({ cv: this.cvFile });
    } else if (type === 'attachments') {
      this.attachments = Array.from(files);
      this.personalInfoForm.patchValue({ attachments: this.attachments });
    }
    this.calculateProfileCompleteness();
  }

  getAttachmentsCount(): number {
    return this.attachments.length;
  }

  addSkill(): void {
    if (this.newSkill.trim()) {
      if (!this.skillsList.includes(this.newSkill.trim())) {
        this.skillsList.push(this.newSkill.trim());
        this.newSkill = '';
        this.calculateProfileCompleteness();
      }
    }
  }

  removeSkill(skill: string): void {
    this.skillsList = this.skillsList.filter(s => s !== skill);
    this.calculateProfileCompleteness();
  }

  addLanguage(): void {
    if (this.newLanguage.trim()) {
      if (!this.languagesList.includes(this.newLanguage.trim())) {
        this.languagesList.push(this.newLanguage.trim());
        this.newLanguage = '';
        this.calculateProfileCompleteness();
      }
    }
  }

  removeLanguage(language: string): void {
    this.languagesList = this.languagesList.filter(l => l !== language);
    this.calculateProfileCompleteness();
  }

  submitProfile(): void {
    if (this.personalInfoForm.valid) {
      // Here you would typically save the profile data to your backend
      console.log('Profile data:', {
        ...this.personalInfoForm.value,
        skills: this.skillsList,
        languages: this.languagesList,
        profileImage: this.profileImage
      });
      
      // Navigate to dashboard after successful save
      this.navigateToDashboard();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.personalInfoForm.controls).forEach(key => {
        const control = this.personalInfoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/etudiant/dashboard']);
  }
}