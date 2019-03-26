import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('chatBox') chatBox: ElementRef;
  messageText: string;
  constructor(public chatService: ChatService) {
    this.chatService.connectionEstablishedEvent.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.chatService.isConnected = true;
        this.chatService.message.subscribe(message => {
          console.log('Message received', message);
          if (message.type !== 'open' && message.type !== 'close') {
            const msg = JSON.parse(message.data);
            if (msg.type === 'greet') {
              this.chatService.username = msg.to;
            }
            this.displayMessage(msg.from, msg.message);
          }
        });
      }
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.messageText);
    this.displayMessage(this.chatService.username, this.messageText);
    this.messageText = '';
  }

  displayMessage(username: string, message: string) {
    const p = document.createElement('p');
    p.innerHTML = username + ' : ' + message;
    this.chatBox.nativeElement.appendChild(p);
  }
}
