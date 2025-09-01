import { Injectable } from '@angular/core';
import { Firestore, collectionData, addDoc, collection, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ChatMessage {
  id?: string;
  text: string;
  timestamp: number;
  senderName: string;
  senderRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesCollection;
  private messagesQuery;

  constructor(private firestore: Firestore) {
    this.messagesCollection = collection(this.firestore, 'messages');
    this.messagesQuery = query(this.messagesCollection, orderBy('timestamp', 'asc'));
  }

  getMessages(): Observable<ChatMessage[]> {
    return collectionData(this.messagesQuery, { idField: 'id' }) as Observable<ChatMessage[]>;
  }

  sendMessage(text: string, senderName: string, senderRole: string): Promise<void> {
    const message: ChatMessage = {
      text,
      timestamp: Date.now(),
      senderName,
      senderRole
    };
    return addDoc(this.messagesCollection, message).then(() => {});
  }
}