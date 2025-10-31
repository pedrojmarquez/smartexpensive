import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import { FooterComponent } from "src/app/components/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent, IonIcon, IonGrid, IonRow, IonCol]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
