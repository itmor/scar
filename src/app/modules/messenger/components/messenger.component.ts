import { Component, OnInit } from '@angular/core';

import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  constructor(private whatsappService: WhatsappService) {}
  ngOnInit(): void {
    this.whatsappService.sock$.subscribe((sock) => {

    });
  }
}
