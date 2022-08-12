import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'view-queue',
        loadChildren: () => import('../view-queue/view-queue.module').then( m => m.ViewQueuePageModule)
      },
      {
        path: 'admin-home',
        loadChildren: () => import('../admin-home/admin-home.module').then( m => m.AdminHomePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/admin-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/admin-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
