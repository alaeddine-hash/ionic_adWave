import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdFormComponent } from './ad-form/ad-form.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'create-ad', // This is the URL path for the ad creation form
    component: AdFormComponent, // The component to display when navigating to 'create-ad'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'all-ads',
    loadChildren: () => import('./all-ads/all-ads.module').then( m => m.AllAdsPageModule)
  },
  {
    path: 'user-ads',
    loadChildren: () => import('./user-ads/user-ads.module').then( m => m.UserAdsPageModule)
  },
  
    {
      path: 'edit-ad/:id', // Add :id to indicate a route parameter
      loadChildren: () => import('./edit-ad/edit-ad.module').then((m) => m.EditAdPageModule),
    },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
