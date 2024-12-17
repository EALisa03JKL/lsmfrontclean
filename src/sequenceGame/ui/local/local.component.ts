import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// Model imports
import { ApiDictionaryContent } from '../../../dictionary/infrastructure/models/dictionary-api.model';

// Service imports
import { DecodeJwtService } from '../../../shared/LocalManager/decode.jwt';
import { LocalKeys, LocalManagerService } from '../../../shared/LocalManager/storage.servicee';
import { SequenceUseCaseService } from '../../application/sequence-use-case.service';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css',
})
export class LocalComponent implements OnInit {
  private _sequenceUseCase = inject(SequenceUseCaseService);
  private _decodeJwtService = inject(DecodeJwtService);

  searchControl = new FormControl('');
  public _sequence = signal<ApiDictionaryContent[]>([]); // Secuencia completa
  public _userSequence = signal<string[]>([]);

  // Computed signals
  currentSign = computed(() =>
    this._sequence().length > 0
      ? this._sequence()[this._sequence().length - 1]
      : null
  );

  isGameOver = signal(false);
  allSigns = signal<ApiDictionaryContent[]>([]);
  filteredItems = computed(() => {
    const searchValue = this.searchControl.value?.toLowerCase() || '';
    return this.allSigns().filter((sign) =>
      sign.name.toLowerCase().includes(searchValue)
    );
  });

  isLoading = signal(true);
  points = signal(0);
  sequenceRemembered = signal(0);

  private _startTime = signal(0);
  elapsedTime = computed(() =>
    Math.floor((Date.now() - this._startTime()) / 1000)
  );

  userHighPoints = signal<{ id: string; points: number; sequenceRemembered: number } | null>(null);

  ngOnInit() {
    this._sequenceUseCase.getAllContent().subscribe((data) => {
      this.allSigns.set(data);
      this.isLoading.set(false);
      this._startTime.set(Date.now());
      this.startSequence();
    });

    this.getUserHighPoints();

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {});
  }

  nextSign() {
    const randomSign =
      this.allSigns()[Math.floor(Math.random() * this.allSigns().length)];
    this._sequence.update((sequence) => [...sequence, randomSign]);
  }

  startSequence() {
    this._sequence.set([]);
    this._userSequence.set([]);
    this.isGameOver.set(false);
    this.points.set(0);
    this.sequenceRemembered.set(0);
    this.nextSign();
  }

  checkSequence() {
    const currentSequence = this._sequence();
    const userSequence = this._userSequence();

    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i] !== currentSequence[i].name) {
        this.isGameOver.set(true);
        this.sendDataPoints();
        return;
      }
    }

    this.points.update((points) => points + 10);
    this.sequenceRemembered.update((count) => count + 1);
    this._userSequence.set([]);
    this.nextSign();
  }

  addUserInput(name: string) {
    this._userSequence.update((sequence) => [...sequence, name]);
    if (this._userSequence().length === this._sequence().length) {
      this.checkSequence();
    }
  }

  removeUserInput(name: string) {
    this._userSequence.update((sequence) =>
      sequence.filter((item) => item !== name)
    );
  }

  resetGame() {
    this._sequence.set([]);
    this._userSequence.set([]);
    this.isGameOver.set(false);
    this.searchControl.setValue('');
    this.points.set(0);
    this.sequenceRemembered.set(0);
    this._startTime.set(Date.now());
    this.nextSign();
  }

  sendDataPoints() {
    const token = LocalManagerService.getElement(LocalKeys.token);
    if (token) {
      const userID = this._decodeJwtService.decodeId(token);
      const data = {
        userID,
        points: this.points(),
        sequenceRemembered: this.sequenceRemembered(),
      };

      this._sequenceUseCase.saveUserPoints(data).subscribe({
        next: (response) => console.log('Data sent', response),
        error: (error) => console.error('Error sending points', error),
      });
    }
  }

  getUserHighPoints() {
    const token = LocalManagerService.getElement(LocalKeys.token);
    if (token) {
      const userID = this._decodeJwtService.decodeId(token);
      this._sequenceUseCase.getUserPoints(userID).subscribe({
        next: (data) => {
          this.userHighPoints.set({
            id: userID,
            points: data.points,
            sequenceRemembered: data.sequenceRemembered,
          });
        },
        error: (error) => console.error('Error fetching high points', error),
      });
    }
  }
}
