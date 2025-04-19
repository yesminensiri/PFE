import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 👈 AJOUT ICI

@Component({
  standalone:false,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  isLoading = false;
  submitSuccess = false;
  submitError = '';

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  get formControls(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.submitted = true;
    this.submitError = '';

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', this.contactForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitted = false;
      }, 1500);
    } catch (error) {
      this.isLoading = false;
      this.submitError = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
      console.error('Error submitting form:', error);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.formControls[controlName];
    
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Ce champ est requis';
      }
      if (control.errors['email']) {
        return 'Veuillez entrer une adresse email valide';
      }
      if (control.errors['minlength']) {
        return `Minimum ${control.errors['minlength'].requiredLength} caractères requis`;
      }
    }
    
    return '';
  }
}
