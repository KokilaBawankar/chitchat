import {Component} from '@angular/core';
import {ChatService} from './chat.service';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public chatService: ChatService) {
    this.chatService.connectionEstablishedEvent.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.chatService.isConnected = true;
        this.chatService.message.subscribe(data => {
          console.log('Message received', data);
        });
      }
    });
  }
}
