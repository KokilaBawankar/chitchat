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
  onlineUsers = [];
  showOnlineUsers = false;
  chatWithSpecificUsername: string;

  constructor(public chatService: ChatService) {
    this.chatService.connectionEstablishedEvent.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.chatService.isConnected = true;

        this.chatService.message.subscribe(message => {
          console.log('Message received', message);
          if (message.type !== 'open' && message.type !== 'close') {
            console.log('**', message.data);
            const msg = JSON.parse(message.data);
            if (msg.type === 'greet') {

              this.chatService.username = msg.to;
              this.displayMessage(msg.from, msg.message);

            } else if (msg.type === 'onlineUsers') {

              this.onlineUsers = msg.message;
              this.showOnlineUsers = true;

            } else if (msg.type === 'chatWithSpecificUser') {

              this.chatWithSpecificUsername !== msg.from ? this.goToSpecificUserChat(msg.from) : null;
              this.displayMessage(msg.from, msg.message);

            } else {

              this.displayMessage(msg.from, msg.message);

            }
          }
        });

      }
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.messageText, this.chatWithSpecificUsername ? this.chatWithSpecificUsername : null);
    this.displayMessage(this.chatService.username, this.messageText);
    this.messageText = '';
  }

  getOnlineUsers() {
    this.chatService.getOnlineUsers();
  }

  displayMessage(username: string, message: string) {
    const p = document.createElement('p');
    p.innerHTML = username + ' : ' + message;
    this.chatBox.nativeElement.appendChild(p);
  }

  goToSpecificUserChat(username: string) {
    while (this.chatBox.nativeElement.firstChild) {
      this.chatBox.nativeElement.removeChild(this.chatBox.nativeElement.firstChild);
    }
    const h3 = document.createElement('h3');
    h3.innerHTML = username;
    this.chatBox.nativeElement.appendChild(h3);
    this.chatWithSpecificUsername = username;
  }
}
