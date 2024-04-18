import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FingerPageRoutingModule } from './finger-routing.module';

import { FingerPage } from './finger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FingerPageRoutingModule
  ],
  declarations: [FingerPage]
})
export class FingerPageModule {}
