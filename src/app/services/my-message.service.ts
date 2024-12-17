import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MyMessageService {

  showMessageSubject: Subject<Message> = new Subject<Message>();

  showMessage(message: Message) {
    this.showMessageSubject.next(message);
  }

}
