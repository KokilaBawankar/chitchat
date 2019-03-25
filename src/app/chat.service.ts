import {EventEmitter, Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import { environment } from '../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message: Subject<any>;
  public connectionEstablishedEvent: EventEmitter<boolean> = new EventEmitter(false);
  isConnected = false;

  constructor(private websocketService: WebsocketService) {}

  initiateConnection() {
    this.message = <Subject<any>>this.websocketService
      .connect(environment.CHAT_URL);
    this.connectionEstablishedEvent.emit(true);
  }

  sendMessage(message?: string) {
    this.message.next(message ? message : 'Echo message');
    console.log('Message sent.');
  }

  close() {
    this.message.complete();
    this.isConnected = false;
  }
}
