import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CalcadoService } from '../service/calcados.service';

@Component({
  selector: 'app-interesses',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './interesses.page.html',
  styleUrls: ['./interesses.page.scss'],
})
export class InteressesPage implements OnInit {
  interesses$ = this.calcadoService.listarInteressesDoUsuario();

  constructor(private calcadoService: CalcadoService) {}

  ngOnInit(): void {}
}
