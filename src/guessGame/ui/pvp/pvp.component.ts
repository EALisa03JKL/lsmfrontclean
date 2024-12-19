import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketsService } from '../../../shared/websockets/web-sockets.service';
import { DecodeJwtService } from '../../../shared/LocalManager/decode.jwt';
import {
  LocalManagerService,
  LocalKeys,
} from '../../../shared/LocalManager/storage.servicee';
import { AuthApiService } from '../../../auth/infrastructure/auth-api.service';
import { FormsModule } from '@angular/forms';
import {
  EstadoJuego,
  SalaBackend,
  statusRespuesta,
} from '../../../shared/websockets/interfaces/sala';
import { Jugador } from '../../../shared/websockets/interfaces/Jugador';

@Component({
  selector: 'app-pvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pvp.component.html',
  styleUrls: ['./pvp.component.css'],
})
export class PvpComponent implements OnInit, OnDestroy {
  _decodeJwtService = inject(DecodeJwtService);
  _AuthApiService = inject(AuthApiService);

  jugador1 = signal<Jugador>({ name: '' });
  jugador2 = signal<Jugador>({ name: '' });
  imageURL = signal<string>('');
  estado = signal<EstadoJuego>('ESPERANDO_JUGADOR');
  name = signal<string>('');
  respuesta = signal<statusRespuesta>('ESPERANDO_RESPUESTA');
  numeroJugador = signal<1 | 2 | undefined>(undefined);
  id = signal<number | undefined>(undefined);

  currentRoom: SalaBackend = {
    roomID: 0,
    players: [{ name: '' }, { name: '' }],
    status: 'ESPERANDO_JUGADOR',
    imageURL: '',
    signal: '',
    publica: false,
  };
  currentPlayer: string = 'player1';
  gameStatus: any = {};
  roomId: any;

  newMessage: string = '';
  messages: string[] = [];

  constructor(private webSocketService: WebSocketsService) {}

  ngOnInit(): void {
    const token = LocalManagerService.getElement(LocalKeys.token);
    if (token) {
      this._AuthApiService.getUserData(token).subscribe((data: any) => {
        this.currentPlayer = data.id;
      });
    }

    this.webSocketService.getGameState().subscribe((state) => {
      this.messages.push(state);
    });

    this.webSocketService.actualizacionDeSala$.subscribe((sala) => {
      this.currentRoom = sala;
      this.desestructurarSala(sala);
    });
  }

  desestructurarSala(salaBack: SalaBackend) {
    console.log('desestructurando: ', salaBack);
    this.id.set(salaBack.roomID);
    this.jugador1.set(salaBack.players[0]);
    this.jugador2.set(salaBack.players[1]);
    this.estado.set(salaBack.status);
    this.imageURL.set(salaBack.imageURL);
    this.name.set(salaBack.signal);
  }

  async findRoom() {
    try {
      const room = await this.webSocketService.findRoom();
      this.currentRoom = room;
      console.log('Found room:', room);
    } catch (error) {
      console.error('Error finding room:', error);
    }
  }

  async createRoom() {
    try {
      const room = await this.webSocketService.createRoom({
        isPublic: true,
        userID: this.currentPlayer,
      });
      this.currentRoom = room;
      console.log('Created room:', room);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  }

  async joinRoom(roomID: number) {
    try {
      const room = await this.webSocketService.joinRoom({
        roomID,
        userID: this.currentPlayer,
      });
      this.currentRoom = room;
      console.log('Joined room:', room);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  }

  play() {
    if (this.currentRoom && this.currentPlayer) {
      this.webSocketService.play(
        this.currentRoom.roomID.toString(),
        this.currentPlayer,
        this.gameStatus
      );
    }
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
