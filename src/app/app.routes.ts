import { Routes } from '@angular/router';
import { GamesmenuComponent } from './gamesmenu/gamesmenu.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RankingsComponent } from './rankings/rankings.component';

export const routes: Routes = [
  {
    path: 'dictionary',
    loadComponent: () => import('./dictionary/ui/ui.component').then((m) => m.UiComponent),
  },
  {
    path: 'games',
    component: GamesmenuComponent,
  },
  { path: 'menu', component: MainmenuComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ranking', component: RankingsComponent },

];
