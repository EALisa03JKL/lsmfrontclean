import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private messagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor() {
    // Conectar al servidor WebSocket de NestJS
    this.socket = io('http://localhost:3001/guess'); // Cambia la URL si es necesario
  }

  // Método para escuchar mensajes desde el servidor
  listenToServer() {
    this.socket.on('encontrarSala', (data: any) => {
      console.log('Recibido:', data);
      // Procesar y actualizar los mensajes recibidos
      this.messagesSubject.next([...this.messagesSubject.value, data]);
    });

    this.socket.on('crearSala', (data: any) => {
      console.log('Sala creada:', data);
    });

    this.socket.on('unirseASala', (data: any) => {
      console.log('Unido a la sala:', data);
    });

    this.socket.on('jugar', (data: any) => {
      console.log('Jugar:', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });
  }

  // Método para emitir eventos al servidor
  sendMessage(event: string, args: any) {
    this.socket.emit(event, args);
  }

  // Obtener los mensajes o eventos recibidos
  getMessages() {
    return this.messagesSubject.asObservable();
  }

  // Método para desconectar el socket
  disconnect() {
    this.socket.disconnect();
  }
}
