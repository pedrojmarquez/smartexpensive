import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private SESSION_KEY = 'sessionID';
  private ready: Promise<void>;
  private token: string | null = null;
  private headers = new HttpHeaders();
  apiComunUrl = 'http://localhost:8080';

  constructor(private storage: Storage,private http: HttpClient) {
    this.ready = this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  private async ensureReady() {
    await this.ready;
  }

  async setSession(token: string) {
    await this.ensureReady();
    await this._storage?.set(this.SESSION_KEY, token);
    this.token = token;
    console.log('✅ Token guardado correctamente en Storage');
  }

  async getSession() {
    await this.ensureReady();
    const token = await this._storage?.get(this.SESSION_KEY);
    return token;
  }

  async clearSession() {
    await this.ensureReady();
    await this._storage?.remove(this.SESSION_KEY);
  }

  getApiBaseUrl(){
    return this.apiComunUrl;
  }

  CreateAuthorizationHeader(headers: HttpHeaders){
    const headerJson = {
      'Content-type':'application/json',
      Authorization: `Bearer ${this.token}`
    };
    this.headers = new HttpHeaders(headerJson);
  }

  get(url:any){
    const headers = new HttpHeaders();
    this.CreateAuthorizationHeader(headers);
    return this.http.get<Object>(
      url,
      {
        headers: this.headers
      }
    );
  }

  post(url:any, body:any){
    const headers = new HttpHeaders();
    this.CreateAuthorizationHeader(headers);
    return this.http.post<Object>(
      url,
      body,
      {
        headers: this.headers
      }
    );
  }

  put(url:any, body:any){
    const headers = new HttpHeaders();
    this.CreateAuthorizationHeader(headers);
    return this.http.put<Object>(
      url,
      body,
      {
        headers: this.headers
      }
    );
  }

  delete(url:any,responseType: 'json' ){
    const headers = new HttpHeaders();
    this.CreateAuthorizationHeader(headers);
    return this.http.delete<Object>(
      url,
      {
        headers: this.headers,
        responseType: responseType as 'json'
      }
    );
  }
}
