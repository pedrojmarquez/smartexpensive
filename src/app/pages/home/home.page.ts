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
import {GastosService} from "../../services/gastos-service";

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
  gastos: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private gastosService: GastosService
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

      //Cargar los gastos
      this.gastosService.getGastos().subscribe({
        next: (response) => {
          this.gastos = response;
          console.log('Gastos cargados:', this.gastos);
        },
        error: (error) => {
          console.log('Error al cargar los gastos:', error);
        }
      });

      this.loading = false;
    });


  }
  async logout() {
    await this.authService.clearSession();
    this.user = null;
    console.log('Sesión cerrada.');
  }


  async prueba() {
    const token = await this.authService.getSession();
    if (token) {
      console.log('Token actual:', token);
    } else {
      console.log('No hay token guardado');
    }

    this.usuarioService.getUsuario().subscribe({
      next: (response) => {
        this.user = response;
        console.log('Usuario autenticado:', this.user);
      },
      error: (error) => {
        console.log('Token expirado o inválido.');
         this.authService.clearSession();
      }
    })
  }

}
