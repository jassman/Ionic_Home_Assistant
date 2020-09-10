import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'temperaturahumedad',
    loadChildren: () => import('./pages/temperaturahumedad/temperaturahumedad.module').then( m => m.TemperaturahumedadPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'habitaciones',
    loadChildren: () => import('./pages/habitaciones/habitaciones.module').then( m => m.HabitacionesPageModule)
  },
  {
    path: 'detecciones',
    loadChildren: () => import('./pages/detecciones/detecciones.module').then( m => m.DeteccionesPageModule)
  },
  {
    path: 'particulas',
    loadChildren: () => import('./pages/particulas/particulas.module').then( m => m.ParticulasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
