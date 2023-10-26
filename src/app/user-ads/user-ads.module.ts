import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAdsPageRoutingModule } from './user-ads-routing.module';

import { UserAdsPage } from './user-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAdsPageRoutingModule
  ],
  declarations: [UserAdsPage]
})
export class UserAdsPageModule {}
