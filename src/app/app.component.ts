import {Component} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public chatService: ChatService) {
    this.chatService.connectionEstablishedEvent.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.chatService.message.subscribe(data => {
          console.log('Message received', data);
        });
      }
    });
  }

  sendMessage() {
    this.chatService.message.next('Echo message');
    console.log('Message sent.');
  }
}
