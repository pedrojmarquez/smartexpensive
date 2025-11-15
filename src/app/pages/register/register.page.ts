import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {LoginService} from "../../services/login-service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, ReactiveFormsModule]
})
export class RegisterPage implements OnInit ,OnChanges{

  formRegister!: FormGroup;
  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });

    toast.present();
  }

  cargarFormulario() {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    }, {
      validators: this.passwordsIguales('password', 'repeatPassword')
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.formRegister.valid) {
      const datos ={
        nombre: this.formRegister.value.nombre,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password
      }
      console.log(datos);
      this.loginService.register(datos).subscribe({
        next: (response) => {
          this.mostrarToast('Cuenta creada correctamente', 'success');

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.mostrarToast('Error al crear la cuenta', 'danger');
        }
      })
    }else{
      this.formRegister.markAllAsTouched();
      this.mostrarToast('Email o contraseña incorrectos', 'danger');

    }
  }

  passwordsIguales(password: string, repeatPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.get(password);
      const repeatControl = formGroup.get(repeatPassword);

      if (!passControl || !repeatControl) return null;

      if (repeatControl.errors && !repeatControl.errors['noCoincide']) {
        return null;
      }

      if (passControl.value !== repeatControl.value) {
        repeatControl.setErrors({ noCoincide: true });
      } else {
        repeatControl.setErrors(null);
      }

      return null;
    };
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['this.formRegister.value.repeatPassword'] && changes['this.formRegister.value.repeatPassword'].currentValue){

    }
  }




}
