import { inject, Injectable } from '@angular/core';
import { MemoryApiService } from '../infrastructure/memory-api.service';
import { MemoryApiGame } from '../infrastructure/models/memory-api.model';

@Injectable({
  providedIn: 'root',
})
export class MemoryLocalUseCaseService {
  private _memoryApiService = inject(MemoryApiService);

  getAllContent() {
    return this._memoryApiService.getAllContent();
  }

  getUserPoints(id: string) {
    return this._memoryApiService.getUserPoints(id);
  }

  updateUserPoints(data: MemoryApiGame) {
    return this._memoryApiService.updateUserPoints(data);
  }

  compareWords(word: string, wordToCompare: string) {
    return this._memoryApiService.compareWords(word, wordToCompare);
  }
}
