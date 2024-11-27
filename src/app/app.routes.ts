import { Routes } from '@angular/router';
import { GamesmenuComponent } from './gamesmenu/gamesmenu.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RankingsComponent } from './rankings/rankings.component';

export const routes: Routes = [
  {
    path: 'dictionary',
    loadComponent: () => import('./dictionary/ui/ui.component').then((m) => m.UiComponent)
  },
  {
    path: 'mainmenu',
    loadComponent: () => import('./mainmenu/ui/ui.component').then((m) => m.UiComponent) 
  },
  {
    path: 'gamesmenu',
    loadComponent: () => import('./gamesmenu/ui/ui.component').then((m) => m.UiComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/ui/ui.component').then((m) => m.UiComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/ui/ui.component').then((m) => m.UiComponent) 
  },
  
];
