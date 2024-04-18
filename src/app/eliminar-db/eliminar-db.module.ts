import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarDBPageRoutingModule } from './eliminar-db-routing.module';

import { EliminarDBPage } from './eliminar-db.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarDBPageRoutingModule
  ],
  declarations: [EliminarDBPage]
})
export class EliminarDBPageModule {}
