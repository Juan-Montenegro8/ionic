import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FingerPage } from './finger.page';

const routes: Routes = [
  {
    path: '',
    component: FingerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FingerPageRoutingModule {}
