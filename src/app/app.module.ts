import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatHeaderComponent,
    ChatBoxComponent,
    ChatFooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
