import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon, IonProgressBar,
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
  imports: [IonContent, CommonModule, FormsModule, FooterComponent, IonIcon, IonGrid, IonRow, IonCol, IonSpinner, IonProgressBar]
})
export class HomePage implements OnInit {

  user: any = null;
  loading = true;
  gastos: any = [];
  presupuesto: any;
  presupuestoRestante: any;
  promedioDiario: any;
  totalTransacciones: any;
  totalCatTransacciones: any;
  totalGastos: any;

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
      console.log(token);
      if (token) {
        console.log('Token recibido:', token);
        await this.authService.setSession(token); // Guardar JWT
        // Opcional: limpiar el token de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
        this.cargarGastos();
      }
      const tokenGuardado = await this.authService.getSession();
      if(tokenGuardado){
        this.cargarGastos();
      }

      this.loading = false;
    });
  }


  cargarGastos() {
    this.gastosService.getGastos().subscribe({
      next: (response) => {
        this.gastos = response;
        console.log('Gastos cargados:', this.gastos);
        // Cargar presupuesto
        this.cargarPresupuesto();
      },
      error: (error) => {
        console.log('Error al cargar los gastos:', error);
      }
    });
  }

  cargarPresupuesto() {
    this.gastosService.getPresupuesto().subscribe({
      next: (response) => {
        if(response != null){
          this.presupuesto = response;
          console.log('Presupuesto cargado:', this.presupuesto);
          this.calcularDatos();
          console.log('Datos calculados:', this.totalGastos, this.presupuestoRestante, this.promedioDiario, this.totalTransacciones, this.totalCatTransacciones);
        }
      },
      error: (error) => {
        console.log('Error al cargar el presupuesto:', error);
      }
    });
  }

  calcularDatos() {

    //calcular total de gastos
    this.totalGastos = this.gastos.reduce((acc:any, g:any) => acc + g.total, 0);

    //calcular presupuesto restante
    this.presupuestoRestante = this.presupuesto.montoTotal;
    for (let detalle of this.presupuesto.detallePresupuesto) {
      this.presupuestoRestante -= detalle.montoGastado;
    }

    //calcular promedio diario
    if (!this.gastos || this.gastos.length === 0) this.promedioDiario = 0;

    // 1. Sumar todos los gastos
    const sumaTotal = this.gastos.reduce((acc:any, g:any) => acc + g.total, 0);

    // 2. Obtener los días únicos en los que hubo gasto
    const diasUnicos = new Set(this.gastos.map((g:any) => g.fechaGasto.split("T")[0])).size;

    // 3. Calcular promedio
    this.promedioDiario = diasUnicos > 0 ? (sumaTotal / diasUnicos) : 0;



    //calcular total de transacciones
    this.totalTransacciones = this.gastos.length;

    //calcular total de transacciones por categoria
    this.totalCatTransacciones = new Set(this.gastos.map((g:any) => g.categoria.idCategoria)).size;

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
