import { Component} from '@angular/core';
import { WebSocketService } from '../../../shared/websockets/web-sockets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pvp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pvp.component.html',
  styleUrl: './pvp.component.css',
})
export class PvpComponent {
  newMessage: string = '';
  messages: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  connect(): void {
    this.webSocketService.listenToServer(); // Escuchar los eventos del servidor
    this.webSocketService.sendMessage('encontrarSala', {}); // Enviar mensaje de ejemplo
  }

  disconnect(): void {
    this.webSocketService.disconnect();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.webSocketService.sendMessage('mensaje-custom', {
        message: this.newMessage,
      });
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }
}
