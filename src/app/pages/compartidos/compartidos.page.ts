import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FooterComponent } from "src/app/components/footer/footer.component";

@Component({
  selector: 'app-compartidos',
  templateUrl: './compartidos.page.html',
  styleUrls: ['./compartidos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FooterComponent]
})
export class CompartidosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
