import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/ui/login/login.component';
import { RegisterComponent } from '../auth/ui/register/register.component';
import { HomePageComponent } from '../shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
