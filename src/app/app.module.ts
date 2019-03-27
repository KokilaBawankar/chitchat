import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import {FormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatHeaderComponent,
    ChatBoxComponent,
    ChatFooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChatComponent]
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   const customChatApp = createCustomElement(ChatComponent, {injector});
  //   customElements.define('custom-chat-app', customChatApp );
  // }
  // ngDoBootstrap() {}
}
