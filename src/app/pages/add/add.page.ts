import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton, IonButtons, IonCol,
  IonContent, IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel, IonRow,
  IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FooterComponent } from "src/app/components/footer/footer.component";
import {HttpClient} from "@angular/common/http";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonButton, IonButtons, IonBackButton, IonRow, IonCol, RouterLinkActive, RouterLink,]
})
export class AddPage  {


  mode: 'manual' | 'image' | 'voice' = 'manual';

  // manual
  displayAmount = '';
  manual = { amount: 0, category: null, date: new Date().toISOString() };
  categories = ['Comida', 'Transporte', 'Ocio', 'Hogar', 'Otros'];
  keypadRows = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['.']];

  // image
  selectedImage: string | null = null;
  imageFile: File | null = null;

  // voice
  recording = false;
  transcript = '';

  //inyectar httpClient


  constructor() {
  }



  selectMode(m: 'manual'|'image'|'voice') {
    this.mode = m;
  }

  // Numpad
  onKey(k: string) {
    if (k === '.' && this.displayAmount.includes('.')) return;
    if (k === '.' && this.displayAmount === '') this.displayAmount = '0.';
    else this.displayAmount += k;
    this.manual.amount = parseFloat(this.displayAmount || '0') || 0;
  }
  clear() {
    this.displayAmount = '';
    this.manual.amount = 0;
  }
  backspace() {
    this.displayAmount = this.displayAmount.slice(0, -1);
    this.manual.amount = parseFloat(this.displayAmount || '0') || 0;
  }

  useNow() {
    this.manual.date = new Date().toISOString();
  }

  submitManual() {
    if (!this.manual.amount || !this.manual.category) {
      alert('Introduce importe y categoría');
      return;
    }
    const payload = {
      amount: this.manual.amount,
      category: this.manual.category,
      date: this.manual.date,
      source: 'manual'
    };
    // POST al backend
    // this.http.post('/api/expenses', payload).subscribe(() => {
    //   alert('Gasto guardado');
    //   this.clear();
    // }, err => {
    //   console.error(err);
    //   alert('Error al guardar');
    // });
  }

  // Imagen
  onImageSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.imageFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => this.selectedImage = e.target.result;
    reader.readAsDataURL(this.imageFile);
  }
  captureImage() {
    // Si quieres abrir la cámara en dispositivos móviles, input tipo file con capture="environment"
    // Implementación simple:
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment';
    fileInput.onchange = (e) => this.onImageSelected(e as any);
    fileInput.click();
  }

  sendImageForProcessing() {
    if (!this.imageFile) { alert('Selecciona una imagen'); return; }
    const form = new FormData();
    form.append('file', this.imageFile);
    // this.http.post('/api/expenses/process-image', form).subscribe((res:any) => {
    //   // back devuelve datos extraídos y categoría propuesta
    //   console.log(res);
    //   // Muestra propuesta para confirmación (simplificado)
    //   if (confirm(`Detectado: ${res.amount} € · ${res.category}. Guardar?`)) {
    //     this.http.post('/api/expenses', {
    //       amount: res.amount,
    //       category: res.category,
    //       date: res.date || new Date().toISOString(),
    //       source: 'image',
    //     }).subscribe(()=> alert('Gasto guardado'));
    //   }
    // });
  }

  // Voz (Web Speech API básico)
  toggleRecording() {
    if ((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!this.recording) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;
        recognition.onresult = (evt:any) => {
          this.transcript = evt.results[0][0].transcript;
        };
        recognition.onend = () => { this.recording = false; recognition.stop(); };
        recognition.start();
        this.recording = true;
      } else {
        // stop logic handled by onend
        this.recording = false;
      }
    } else {
      alert('Tu navegador no soporta reconocimiento de voz (usa Chrome/Edge móvil).');
    }
  }

  sendTranscriptForProcessing() {
    if (!this.transcript) return;
    // this.http.post('/api/expenses/process-text', { text: this.transcript }).subscribe((res:any) => {
    //   // backend devuelve amount, category, date
    //   if (confirm(`Detectado: ${res.amount} € · ${res.category}. Guardar?`)) {
    //     this.http.post('/api/expenses', {
    //       amount: res.amount,
    //       category: res.category,
    //       date: res.date || new Date().toISOString(),
    //       source: 'voice',
    //     }).subscribe(()=> alert('Gasto guardado'));
    //   }
    // });
  }



}
