import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: User | null = null;
  nomeUsuario: string = 'Usuário';

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.usuario = this.auth.currentUser;

    if (this.usuario) {
      this.nomeUsuario =
        this.usuario.displayName ||
        this.usuario.email?.split('@')[0] ||
        'Não fornecido';
    }
  }
}
