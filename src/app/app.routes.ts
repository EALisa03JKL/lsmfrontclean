import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/ui/login/login.component';
import { RegisterComponent } from '../auth/ui/register/register.component';
import { HomePageComponent } from '../shared/pages/home-page/home-page.component';
import { DashboardComponent } from '../shared/pages/dashboard/dashboard.component';
import { AuthGuard } from '../auth/application/user/auth.guard';

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
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
