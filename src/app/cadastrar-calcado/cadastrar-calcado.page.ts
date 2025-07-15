import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalcadoService, Calcado } from '../service/calcados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-calcado',
  templateUrl: './cadastrar-calcado.page.html',
  styleUrls: ['./cadastrar-calcado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastrarCalcadoPage {
  descricao = '';
  tamanho: number | null = null;
  lado: 'esquerdo' | 'direito' | null = null;

  constructor(
    private calcadoService: CalcadoService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async cadastrar() {
    if (!this.descricao || !this.tamanho || !this.lado) {
      this.mostrarMensagem('Preencha todos os campos!', 'danger');
      return;
    }

    try {
      await this.calcadoService.adicionarCalcado({
        descricao: this.descricao,
        tamanho: this.tamanho,
        lado: this.lado,
      });
      this.mostrarMensagem('Calçado cadastrado com sucesso!', 'success');
      this.router.navigateByUrl('/calcados-disponiveis');
    } catch (err) {
      this.mostrarMensagem('Erro ao cadastrar calçado.', 'danger');
    }
  }

  async mostrarMensagem(msg: string, color = 'primary') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color,
    });
    toast.present();
  }
}
