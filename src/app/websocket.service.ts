import {EventEmitter, Injectable} from '@angular/core';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject: Rx.Subject<MessageEvent>;
  public wsServer: any;

  constructor() {}

  connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  create(url): Rx.Subject<MessageEvent> {
    this.wsServer = new WebSocket(url);
    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        this.wsServer.onopen = obs.next.bind(obs);
        this.wsServer.onmessage = obs.next.bind(obs);
        this.wsServer.onerror = obs.error.bind(obs);
        this.wsServer.onclose = obs.complete.bind(obs);
        return this.wsServer.close.bind(this.wsServer);
      });

    const observer = {
      next: (data: Object) => {
        if (this.wsServer.readyState === WebSocket.OPEN) {
          this.wsServer.send(JSON.stringify(data));
        }
      },
      complete: (data: Object) => {
        this.wsServer.close();
        console.log('Disconnecting.');
      }
    }
    return Rx.Subject.create(observer, observable);
  }
}
