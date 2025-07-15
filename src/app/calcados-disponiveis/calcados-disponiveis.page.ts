import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { CalcadoService } from '../service/calcados.service';

@Component({
  selector: 'app-calcados-disponiveis',
  templateUrl: './calcados-disponiveis.page.html',
  styleUrls: ['./calcados-disponiveis.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CalcadosDisponiveisPage implements OnInit {
  calcados$!: Observable<any[]>;

  constructor(
    private calcadoService: CalcadoService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.calcados$ = this.calcadoService.listarCalcados();
  }

  async manifestarInteresse(calcado: any) {
    try {
      await this.calcadoService.manifestarInteresse(calcado.id);

      const toast = await this.toastController.create({
        message: 'Interesse registrado com sucesso!',
        duration: 2000,
        color: 'success',
      });

      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erro ao manifestar interesse.',
        duration: 2000,
        color: 'danger',
      });

      await toast.present();
    }
  }
}
