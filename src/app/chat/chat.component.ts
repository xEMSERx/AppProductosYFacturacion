import { Component } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  messages$: Observable<ChatMessage[]>;
  newMessage: string = '';
  senderName: string = 'Usuario';
  senderRole: string = 'user';

  constructor(private chatService: ChatService) {
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage, this.senderName, this.senderRole);
      this.newMessage = '';
    }
  }
}