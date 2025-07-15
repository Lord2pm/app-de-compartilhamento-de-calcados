import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './cadastro.page.html',
})
export class CadastroPage {
  nome = '';
  email = '';
  senha = '';
  ladoAmputado = '';
  mensagem = '';
  classeMensagem = '';

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    this.authService
      .cadastrar(this.email, this.senha)
      .then(() => {
        this.mensagem = 'Conta criada com sucesso!';
        this.classeMensagem = 'sucesso';

        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1500);
      })
      .catch((err) => {
        this.mensagem = 'Erro: ' + this.traduzErro(err.message);
        this.classeMensagem = 'erro';
      });
  }

  traduzErro(erro: string): string {
    console.log(erro);
    if (erro.includes('email-already-in-use')) return 'E-mail já está em uso';
    if (erro.includes('invalid-email')) return 'E-mail inválido';
    if (erro.includes('weak-password'))
      return 'Senha muito fraca (mín. 6 caracteres)';
    return 'Erro ao criar conta';
  }

  irParaLogin() {
    this.router.navigateByUrl('/login');
  }
}
