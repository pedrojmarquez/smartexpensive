import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GastosService {

  ruta: string;

  constructor(private http: HttpClient,private authService: AuthService) {
    this.ruta = this.authService.getApiBaseUrl();
  }

  getGastos(): Observable<any> {
    return this.authService.get(this.ruta + '/api/gastos/me');
  }

  saveGasto(gasto: any): Observable<any> {
    return this.authService.post(this.ruta + '/api/gastos/save', gasto);
  }

  getCategorias(): Observable<any> {
    return this.authService.get(this.ruta + '/api/gastos/categorias');
  }

}
