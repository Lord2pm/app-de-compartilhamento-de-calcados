import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';

import { AuthService } from './service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private menu: MenuController
  ) {}

  async navegar(url: string) {
    this.router.navigateByUrl(url);
    await this.menu.close('main');
  }

  async sair() {
    await this.auth.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
    await this.menu.close('main');
  }
}
