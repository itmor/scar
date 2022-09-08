import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  WASocket,
} from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  sock$ = new ReplaySubject<WASocket>(1);
  qrData$ = new ReplaySubject<string>(1);
  isConnected$ = new ReplaySubject<boolean>(1);

  private readonly makeWASocket: typeof makeWASocket;
  private readonly fetchLatestBaileysVersion: typeof fetchLatestBaileysVersion;
  private readonly useMultiFileAuthState: typeof useMultiFileAuthState;

  constructor() {
    this.makeWASocket = window.module.require('@adiwajshing/baileys').default;
    this.fetchLatestBaileysVersion = window.require('@adiwajshing/baileys').fetchLatestBaileysVersion;
    this.useMultiFileAuthState = window.require('@adiwajshing/baileys').useMultiFileAuthState;
    this.connect().then();
  }

  private async connect(): Promise<void> {
    this.isConnected$.next(false);
    this.qrData$.next(null);
    const sock = await this.getNewConnection();

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;
      if (qr) {
        this.qrData$.next(qr);
      }
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        this.isConnected$.next(false);
        this.qrData$.next(null);

        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === 'open') {
        this.isConnected$.next(true);
      }
    });
  }

  private async getNewConnection() {
    const { version } = await this.fetchLatestBaileysVersion();
    const { state, saveCreds } = await this.useMultiFileAuthState('scar_auth_info');

    const sock = this.makeWASocket({
      version,
      auth: state,
      syncFullHistory: true,
      printQRInTerminal: false,
      browser: Browsers.macOS('Desktop'),
    });

    sock.ev.on('creds.update', saveCreds);

    this.sock$.next(sock);
    return sock;
  }
}
