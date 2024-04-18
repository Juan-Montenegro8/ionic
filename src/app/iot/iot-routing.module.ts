import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IotPage } from './iot.page';

const routes: Routes = [
  {
    path: '',
    component: IotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IotPageRoutingModule {}
