import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { QrCodeModule } from 'ng-qrcode';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, NzSpinModule, LoginRoutingModule, QrCodeModule],
})
export class LoginModule {}
