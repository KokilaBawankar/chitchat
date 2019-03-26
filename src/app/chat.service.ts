import {EventEmitter, Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import { environment } from '../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message: Subject<any>;
  public username: string;
  public connectionEstablishedEvent: EventEmitter<boolean> = new EventEmitter(false);
  isConnected = false;

  constructor(private websocketService: WebsocketService) {}

  initiateConnection() {
    this.message = <Subject<any>>this.websocketService
      .connect(environment.CHAT_URL);
    this.connectionEstablishedEvent.emit(true);
  }

  sendMessage(message: string, toUser: string) {
    const msgToSend = {
      to: toUser != null ? toUser : 'ChitChat Bot',
      from: this.username,
      message : message,
      type: toUser != null ? 'chatWithSpecificUser' : 'broadcast'
    }
    this.message.next(msgToSend);
    console.log('Message sent.', msgToSend);
  }

  getOnlineUsers() {
    const msgToSend = {
      to: 'ChitChat Server',
      from: this.username,
      message: 'Send online users list.',
      type: 'onlineUsers'
    }
    this.message.next(msgToSend);
    console.log('Message sent.', msgToSend);
  }

  close() {
    this.message.complete();
    this.isConnected = false;
  }
}
