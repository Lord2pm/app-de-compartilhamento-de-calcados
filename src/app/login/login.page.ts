import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  email = '';
  senha = '';
  mensagem = '';
  classeMensagem = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.email, this.senha)
      .then(() => {
        this.mensagem = 'Login realizado com sucesso!';
        this.classeMensagem = 'sucesso';

        setTimeout(() => {
          this.router.navigateByUrl('/calcados-disponiveis', { replaceUrl: true });
        }, 1200);
      })
      .catch((err) => {
        this.mensagem = 'Erro: Email ou Senha incorrectos';
        this.classeMensagem = 'erro';
      });
  }

  irParaCadastro() {
    this.router.navigateByUrl('/cadastro');
  }

  voltarParaHome() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
