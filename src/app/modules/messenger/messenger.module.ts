import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { MessengerRoutingModule } from './messenger-routing.module';

import { MessengerComponent } from './components/messenger.component';

@NgModule({
  declarations: [MessengerComponent],
  imports: [CommonModule, NzButtonModule, MessengerRoutingModule],
})
export class MessengerModule {}
