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



}
