import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private SESSION_KEY = 'sessionID';
  private ready: Promise<void>;
  private token: string | null = null;

  constructor(private storage: Storage) {
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
    console.log('📦 Token leído del Storage:', token);
    return token;
  }

  async clearSession() {
    await this.ensureReady();
    await this._storage?.remove(this.SESSION_KEY);
  }

  getToken(){
    return this.token;
  }
}
