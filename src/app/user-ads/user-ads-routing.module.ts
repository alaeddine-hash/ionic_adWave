import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdsPage } from './user-ads.page';

const routes: Routes = [
  {
    path: '',
    component: UserAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdsPageRoutingModule {}
