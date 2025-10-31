import { Component, OnInit } from '@angular/core';
import { IonContent, IonFooter, IonTitle, IonToolbar, IonIcon, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { RouterLinkActive, RouterModule } from "@angular/router";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonFooter, IonToolbar, IonIcon, RouterLinkActive, IonRow, IonCol, IonButton,RouterModule,RouterLinkActive],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
