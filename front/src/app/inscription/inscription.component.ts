import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

interface SignUp {
  name: string
  email: string
  password: string
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  user: SignUp = {name: '', email: '', password: ''}
  isMissing: boolean = false
  password: string = ''
  passwordForm: FormGroup;
  showPassword = false

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.passwordForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator})
  }


  get passwordControl() {
    return this.passwordForm.get('password');
  }

  get confirmPasswordControl() {
    return this.passwordForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { notMatching: true };
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) return null;
  
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
    if (!hasNumber) {
      console.log("Mot de passe invalide : Il manque un chiffre");
      return { weakPassword: true };
    }
  
    if (!hasSpecialChar) {
      console.log("Mot de passe invalide : Il manque un caractère spécial");
      return { weakPassword: true };
    }
  
    console.log("Mot de passe valide !");
    return null;
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  postSignup(userData: SignUp): void {
    this.http.post('http://localhost:3000/auth/register', userData).subscribe(
      (response) => {
        console.log('User signed up: ', response)
        this.router.navigate([''])
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  OnSubmit(): void {
    if (this.user.name == '' || this.user.email == '') {
      this.isMissing = true
    } else {
      const formsValues = this.passwordForm.value
      this.user.password = formsValues.password
      if (this.user.password == '')
        this.isMissing = true
      this.postSignup(this.user)
    }
  }
}
