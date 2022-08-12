import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; //Also import Reactive Form

import { IonicModule } from '@ionic/angular';

import { ViewQueuePageRoutingModule } from './view-queue-routing.module';

import { ViewQueuePage } from './view-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewQueuePageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ViewQueuePage]
})
export class ViewQueuePageModule {}
