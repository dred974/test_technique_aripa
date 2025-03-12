import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

interface LogIn {
  email: string
  password: string
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  user: LogIn = {email: '', password: ''}
  constructor(private http: HttpClient, private router: Router) {}

  PostLogin(): void {
    this.http.post('http://localhost:3000/auth/login', this.user).subscribe(
      (response) => {
        console.log('User signed up: ', response)
        this.router.navigate(['/home'])
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  OnSubmit(): void {
    this.PostLogin()
  }
}
