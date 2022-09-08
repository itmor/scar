import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  qrCode: string;

  constructor(
    private router: Router,
    private zone: NgZone,
    private whatsappService: WhatsappService,
    private changeDetect: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.whatsappService.isConnected$.pipe(filter((value) => value)).subscribe(() => {
      this.zone.run(() => this.router.navigate(['/messenger']));
    });

    this.whatsappService.qrData$.subscribe((qr) => {
      this.qrCode = qr;
      this.changeDetect.detectChanges();
    });
  }
}
