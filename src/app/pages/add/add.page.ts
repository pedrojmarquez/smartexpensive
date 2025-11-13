import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonBackButton,
  IonButton, IonButtons, IonCol,
  IonContent, IonDatetime, IonDatetimeButton, IonGrid,
  IonHeader,
  IonIcon, IonInput,
  IonItem,
  IonLabel, IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption, IonRow,
  IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import {RouterLink, RouterLinkActive} from "@angular/router";
import {GastosService} from "../../services/gastos-service";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonItem, IonLabel, IonDatetime, IonButton, IonButtons, IonRow, IonCol, RouterLink, IonGrid, IonInput, IonDatetimeButton, IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption, ReactiveFormsModule,]
})
export class AddPage implements OnInit {


  mode: 'manual' | 'image' | 'voice' = 'manual';

  // manual
  cantidad = '';
  manual = { amount: 0, category: null, date: new Date().toISOString(), description: '' };
  categories = ['Comida', 'Transporte', 'Ocio', 'Hogar', 'Otros'];
  numeracion = [['1','2','3'], ['4','5','6'], ['7','8','9']];



  // image
  selectedImage: string | null = null;
  imageFile: File | null = null;

  // voice
  recording = false;
  transcript = '';

  currentValue = 'javascript';
  formularioGasto!: FormGroup;
  categorias: any[] = [];
  categoriasRapidas: any[] = [];
  idsRapidos: any[] = [46,47,50,51,53,78];
  todas:boolean=false;


  constructor(private formBuilder: FormBuilder,
              private gastosService: GastosService) {
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.gastosService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response;

        // filtrar categorias rapidas
        this.categoriasRapidas = this.categorias.filter((categoria) => this.idsRapidos.includes(categoria.idCategoria));
        console.log("Categorias rapidas: ",this.categoriasRapidas);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  seleccionarCategoria(categoria:any){
    this.formularioGasto.patchValue({
      idCategoria: categoria.idCategoria
    })
    console.log(this.formularioGasto.value);
  }


   crearFormulario() {
    this.formularioGasto = this.formBuilder.group({
      total: [0, Validators.required],
      idCategoria: [null, Validators.required],
      fechaGasto: [new Date().toISOString(), Validators.required],
      descripcionGasto: [''],
    })
  }



  guardarGasto() {
    if (this.formularioGasto?.valid) {
      const gasto = {
        nombreComercio: 'Desconocido',
        total: this.formularioGasto.value.total,
        descripcionGasto: this.formularioGasto.value.descripcionGasto,
        fechaGasto: this.formularioGasto.value.fechaGasto,
        idUsuario: 0,
        categoria:{
          idCategoria: this.formularioGasto.value.idCategoria,
        }
      };

      this.gastosService.saveGasto(gasto).subscribe({
        next: (response) => {
          console.log("Gasto guardado: ",response);
          this.resetearFormulario();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  resetearFormulario() {
    this.formularioGasto.reset();
    this.cantidad = '';
    this.todas = false;
  }



  onIonChange(event: CustomEvent) {
    this.currentValue = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
  }



  // selectMode(m: 'manual'|'image'|'voice') {
  //   this.mode = m;
  // }

  // Numpad
  onKey(k: string) {
    if (k === '.' && this.cantidad.includes('.')) return;
    if (k === '.' && this.cantidad === '') this.cantidad = '0.';
    else this.cantidad += k;
    this.formularioGasto.patchValue({ total: parseFloat(this.cantidad) || 0});
  }


  backspace() {
    this.cantidad = this.cantidad.slice(0, -1);
    this.formularioGasto.patchValue({ total: parseFloat(this.cantidad) || 0});
  }



  clear() {
    this.cantidad = '';
    this.manual.amount = 0;
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
