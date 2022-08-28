import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShowNameComponent } from './user/show-name/show-name.component';
import { AddNameComponent } from './user/add-name/add-name.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurde } from './shard/middlewares/auth-gurde.service';

const routes: Routes = [
  { path: "addName", component: AddNameComponent },
  { path: "showName/:id", component: ShowNameComponent },
  { path: "home", component: HomeComponent ,canActivate:[AuthGurde]},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
