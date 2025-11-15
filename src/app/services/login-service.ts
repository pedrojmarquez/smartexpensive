import { Injectable } from '@angular/core';
import {AuthService} from "./auth-service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  ruta: string;
  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.ruta = this.authService.getApiBaseUrl() + '/auth';
  }

  login(datos:any): Observable<any> {
    return this.http.post(this.ruta + '/login', datos,{responseType: 'text'} );
  }

  register(datos:any): Observable<any> {
    return this.http.post(this.ruta + '/register',  datos );
  }


}
