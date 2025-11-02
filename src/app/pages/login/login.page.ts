import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, Platform} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,CommonModule, FormsModule, IonButton, IonIcon]
})
export class LoginPage {

  constructor(private plataform: Platform) { }



  loginWithGoogle() {
    // Redirigir al backend de Spring Boot
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';

  }

  async fetchUser() {
    try {
      const response = await fetch('http://localhost:8080/api/me', {
        credentials: 'include' // importante para que envíe cookies de sesión
      });

      if (!response.ok) {
        throw new Error('No logueado');
      }

      const user = await response.json();
      console.log('Usuario logueado:', user);

      // Aquí puedes guardarlo en tu servicio de usuario para toda la app
      // ejemplo: this.userService.setUser(user);

    } catch (error) {
      console.log('Usuario no logueado', error);
    }
  }

}
