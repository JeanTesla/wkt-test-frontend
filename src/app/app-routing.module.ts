import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuardGuard } from './interceptors/router-guard.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RouterGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
