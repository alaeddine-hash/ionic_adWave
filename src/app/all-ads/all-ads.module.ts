import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAdsPageRoutingModule } from './all-ads-routing.module';

import { AllAdsPage } from './all-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAdsPageRoutingModule
  ],
  declarations: [AllAdsPage]
})
export class AllAdsPageModule {}
