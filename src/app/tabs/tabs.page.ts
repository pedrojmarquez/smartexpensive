import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { people, home, scan  } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,RouterModule],
  
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ home, people, scan});
  }
}
