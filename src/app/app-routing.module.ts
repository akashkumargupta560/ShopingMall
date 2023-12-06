import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
// import { SingupComponent } from './pages/singup/singup.component';
import { MapComponent } from './pages/map/map.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guard/auth.guard';
import { nonAuthGuard } from './guard/non-auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent, canActivate: [authGuard]},
  {path:'login',component:LoginComponent, canActivate: [nonAuthGuard]},
  // {path:'singup',component:SingupComponent},
  {path:'register',component:SignupComponent, canActivate: [nonAuthGuard]},
  {path:'map', component:MapComponent, canActivate: [authGuard]},
  {path:'gallery', component:GalleryComponent, canActivate: [authGuard]},
  {path:'profile', component:ProfileComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
