import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IotPageRoutingModule } from './iot-routing.module';

import { IotPage } from './iot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IotPageRoutingModule
  ],
  declarations: [IotPage]
})
export class IotPageModule {}
