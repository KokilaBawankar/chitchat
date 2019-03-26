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

            const msg = JSON.parse(message.data);
            if (msg.type === 'greet') {

              this.chatService.username = msg.to;
              this.displayMessage(msg.from, msg.message);

            } else if (msg.type === 'onlineUsers') {

              this.onlineUsers = msg.userList;
              this.showOnlineUsers = true;

            } else if (msg.type === 'chatWithSpecificUser') {

              this.chatWithSpecificUsername !== msg.from ? this.goToSpecificUserChat(msg.from) : null;
              msg.message ? this.displayMessage(msg.from, msg.message) : this.displayImage(msg.from, msg.image);

            } else {

              msg.message ? this.displayMessage(msg.from, msg.message) : this.displayImage(msg.from, msg.image);

            }
          }
        });

      }
    });
  }

  sendMessage(message: string, image: string) {
    this.chatService.sendMessage(this.chatWithSpecificUsername ? this.chatWithSpecificUsername : null, message, image);
    message !== null ? this.displayMessage(this.chatService.username, this.messageText)
                     : this.displayImage(this.chatService.username, image);
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

  displayImage(username: string, image) {
    const span = document.createElement('span');
    span.innerHTML = username + ' : ';
    this.chatBox.nativeElement.appendChild(span);
    const img = document.createElement('img');
    img.src = image;
    img.height = 100;
    img.width = 100;
    this.chatBox.nativeElement.appendChild(img);
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

  sendImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    setTimeout(function() {
      input.click();
    }, 200);

    input.onchange = function(event) {
      console.log(event.target.files);
      this.getImageData(event.target.files[0])
        .then((imageData: string) => this.sendMessage(null, imageData));
    }.bind(this);
  }

  getImageData(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        console.log('Selected image data', reader.result );
        return resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error in getting image data', error );
        return resolve(error);
      };
    });
  }
}
