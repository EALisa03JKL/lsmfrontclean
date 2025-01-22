import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecodeJwtService } from '../../../shared/LocalManager/decode.jwt';
import {
  LocalManagerService,
  LocalKeys,
} from '../../../shared/LocalManager/storage.servicee';
import { AuthApiService } from '../../../auth/infrastructure/auth-api.service';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../services/server.service';
import { UsuarioService } from '../../services/usuario.service';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-pvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pvp.component.html',
  styleUrls: ['./pvp.component.css'],
})
export class PvpComponent implements OnDestroy {
  usuarioService = inject(UsuarioService);
  serverService = inject(ServerService);
  salaService = inject(SalaService);
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  async findRoom() {
    this.serverService.server.emitWithAck('encontrarSala').then(res =>{
      console.log("Respuesta del server: ",res);
      if(res === null) {
        this.salaService.crearSala();
      }
      else{
        this.salaService.unirseASala(res);
      }
    })
  }

}
