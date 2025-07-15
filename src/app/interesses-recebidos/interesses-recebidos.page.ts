import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';

import { CalcadoService, InteresseRecebido } from '../service/calcados.service';

@Component({
  selector: 'app-interesses-recebidos',
  templateUrl: './interesses-recebidos.page.html',
  styleUrls: ['./interesses-recebidos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class InteressesRecebidosPage implements OnInit {
  interesses$: Observable<InteresseRecebido[]> =
    this.calcadoService.listarInteressesRecebidos();

  constructor(private calcadoService: CalcadoService) {}

  ngOnInit() {}
}
