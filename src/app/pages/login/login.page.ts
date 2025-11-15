import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon, IonInput,
  IonItem, IonLabel,
  IonTitle,
  IonToolbar,
  Platform
} from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";
import {LottieComponent} from "ngx-lottie";
import {LoginService} from "../../services/login-service";
import {async} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonIcon, IonItem, IonLabel, IonInput, ReactiveFormsModule,LottieComponent]
})
export class LoginPage {


  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  lottieOptions = {
    path: 'assets/lottie/login.json',
    autoplay: true,
    loop: false
  };

  constructor(private plataform: Platform,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) { }



  loginWithGoogle() {
    // Redirigir al backend de Spring Boot
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  login() {
     if(this.formLogin.valid){
      const datos = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      }
      this.loginService.login(datos).subscribe({
        next: (res) => {
          const token = res;
          console.log(token);
          this.authService.setSession(token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
          // this.mostrarToast('Error al iniciar sesión', 'danger');
        }
      });
    }else{
      this.formLogin.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }


}
