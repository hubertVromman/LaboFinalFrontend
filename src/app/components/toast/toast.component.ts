import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MyMessageService } from '../../services/my-message.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private messageService = inject(MessageService);
  private myMessageService = inject(MyMessageService);

  ngOnInit() {
    this.myMessageService.showMessageSubject.subscribe({
      next: message => this.messageService.add({ severity: message.severity ?? 'info', summary: message.title, detail: message.detail, life: 3000 })
    })
  }
}
