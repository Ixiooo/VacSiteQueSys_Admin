import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQueuePage } from './view-queue.page';

const routes: Routes = [
  {
    path: '',
    component: ViewQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQueuePageRoutingModule {}
