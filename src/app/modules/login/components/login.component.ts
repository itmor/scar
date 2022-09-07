import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  qrCode: string;
  isConnected: boolean;

  constructor(private whatsappService: WhatsappService, private changeDetect: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.whatsappService.isConnected$.subscribe((value) => {
      this.isConnected = value;
      this.changeDetect.detectChanges();
    });

    this.whatsappService.qrData$.subscribe((qr) => {
      this.qrCode = qr;
    });
  }
}
