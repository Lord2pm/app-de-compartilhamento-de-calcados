import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'calcados-disponiveis',
    loadComponent: () => import('./calcados-disponiveis/calcados-disponiveis.page').then( m => m.CalcadosDisponiveisPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'cadastrar-calcado',
    loadComponent: () => import('./cadastrar-calcado/cadastrar-calcado.page').then( m => m.CadastrarCalcadoPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'meus-calcados',
    loadComponent: () => import('./meus-calcados/meus-calcados.page').then( m => m.MeusCalcadosPage)
  },
  {
    path: 'interesses',
    loadComponent: () => import('./interesses/interesses.page').then( m => m.InteressesPage)
  },
  {
    path: 'interesses-recebidos',
    loadComponent: () => import('./interesses-recebidos/interesses-recebidos.page').then( m => m.InteressesRecebidosPage)
  },
];
