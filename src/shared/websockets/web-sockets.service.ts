import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { SalaBackend } from './interfaces/sala';

@Injectable({
  providedIn: 'root',
})
export class WebSocketsService {
  private socket: Socket;
  private gameState = new BehaviorSubject<any>(null);
  actualizacionDeSala$ = new Subject<SalaBackend>();

  constructor() {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('gameStateUpdate', (newState) => {
      this.gameState.next(newState);
    });

    this.socket.on('sala', (args) => {
      this.actualizacionDeSala$.next(args);
    });
  }

  findRoom(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('encontrarSala', (roomId: number | null) => {
        if (roomId !== null) {
          resolve({ success: true, roomId });
        } else {
          reject('No hay salas disponibles');
        }
      });
    });
  }

  createRoom(args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('crearSala', args, (response: any) => {
        if (response && response.exito) {
          resolve(response);
        } else {
          reject('Error al crear la sala');
        }
      });
    });
  }

  joinRoom(args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'unirseASala',
        args,
        (response: { exito: boolean; mensaje: string }) => {
          if (response.exito) {
            resolve(response);
          } else {
            reject(response.mensaje);
          }
        }
      );
    });
  }

  play(salaId: string, jugador: string, status: any) {
    this.socket.emit('jugar', { salaId, jugador, status }, (response: any) => {
      console.log('Jugada registrada:', response);
    });
  }

  getGameState() {
    return this.gameState.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
