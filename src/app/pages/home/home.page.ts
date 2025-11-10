import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRange,
  IonRow, IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FooterComponent } from "src/app/components/footer/footer.component";
import {AuthService} from "../../services/auth-service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../services/usuario-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, FooterComponent, IonIcon, IonGrid, IonRow, IonCol, IonSpinner]
})
export class HomePage implements OnInit {

  user: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit() {
    // 1️⃣ Capturar el token de la URL si existe
    this.route.queryParams.subscribe(async params => {
      const token = params['token'];
      if (token) {
        console.log('Token recibido:', token);
        await this.authService.setSession(token); // Guardar JWT
        // Opcional: limpiar el token de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2️⃣ Recuperar el token guardado
      const savedToken = await this.authService.getSession();
      if (savedToken) {
        console.log('Token guardado encontrado:', savedToken);

      } else {
        console.log('No hay token guardado.');
      }

      this.loading = false;
    });
  }
  async logout() {
    await this.authService.clearSession();
    this.user = null;
    console.log('Sesión cerrada.');
  }

  // ngOnInit() {
  //   // this.fetchUser()
  // }

  // async fetchUser() {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/me', {
  //       credentials: 'include' // importante para que envíe cookies de sesión
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error('No logueado');
  //     }
  //
  //     const user = await response.json();
  //     console.log('Usuario logueado:', user);
  //
  //     // Aquí puedes guardarlo en tu servicio de usuario para toda la app
  //     // ejemplo: this.userService.setUser(user);
  //
  //   } catch (error) {
  //     console.log('Usuario no logueado', error);
  //   }
  // }

  prueba() {
    this.usuarioService.getUsuario().subscribe({
      next: (response) => {
        this.user = response;
        console.log('Usuario autenticado:', this.user);
      },
      error: (error) => {
        console.log('Token expirado o inválido.');
         this.authService.clearSession();
      }
    });
  }
}
