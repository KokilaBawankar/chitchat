import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatHeaderComponent,
    ChatBoxComponent,
    ChatFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
