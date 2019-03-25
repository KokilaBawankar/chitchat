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

  constructor(private websocketService: WebsocketService) {}

  initiateConnection() {
    this.message = <Subject<any>>this.websocketService
      .connect(environment.CHAT_URL);
    this.connectionEstablishedEvent.emit(true);
  }
}
