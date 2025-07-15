import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CalcadoService, Calcado } from '../service/calcados.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meus-calcados',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './meus-calcados.page.html',
  styleUrls: ['./meus-calcados.page.scss'],
})
export class MeusCalcadosPage implements OnInit {
  calcados$!: Observable<Calcado[]>;

  constructor(private calcadoService: CalcadoService) {}

  ngOnInit(): void {
    this.calcados$ = this.calcadoService.listarMeusCalcados();
  }
}
