import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(private http: HttpClient,private authService: AuthService) { }



  //petion con autenticacion
  getUsuario(): Observable<any> {
    const token = this.authService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const options = {
      headers: headers,
    };

    return this.http.get('http://localhost:8080/api/usuario', options);
  }

}
