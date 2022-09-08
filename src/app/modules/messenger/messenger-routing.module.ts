import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MessengerComponent } from './components/messenger.component';

import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: 'messenger',
    canActivate: [AuthGuard],
    component: MessengerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessengerRoutingModule {}
