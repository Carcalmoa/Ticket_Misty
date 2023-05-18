import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { ListarComponent } from './components/listar/listar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EventosComponent } from './components/eventos/eventos.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirigir a página de inicio
  { path: '', component: StartComponent }, // componente para página de inicio
  { path: 'listar', component: ListarComponent }, 
  { path: 'cliente', component: ClienteComponent }, 
  { path: 'eventos', component: EventosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
