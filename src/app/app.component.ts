import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabs, IonTab, IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, FooterComponent, IonTabs, IonTab, IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonIcon],
})
export class AppComponent {
  constructor() {}
}
