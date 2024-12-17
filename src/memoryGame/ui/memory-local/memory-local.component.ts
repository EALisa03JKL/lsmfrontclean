import { Component, inject, OnInit } from '@angular/core';
import { MemoryLocalUseCaseService } from '../../application/memory-local-use-case.service';
import { ApiDictionaryContent } from '../../../dictionary/infrastructure/models/dictionary-api.model';
import { CommonModule } from '@angular/common';

interface MemoryCard {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  class: string;
  matched?: boolean; // Add the matched property
}

@Component({
  selector: 'app-memory-local',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-local.component.html',
  styleUrls: ['./memory-local.component.css'],
})
export class MemoryLocalComponent implements OnInit {
  _memoryUseCaseService = inject(MemoryLocalUseCaseService);
  cards: MemoryCard[] = [];
  shuffledCards: MemoryCard[] = [];
  flippedCards: number[] = [];  // Mantiene los índices de las cartas volteadas
  matchedCards: MemoryCard[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;

  ngOnInit(): void {
    this._memoryUseCaseService
      .getAllContent()
      .subscribe((data: ApiDictionaryContent[]) => {
        const transformedData: MemoryCard[] = data.map((item) => ({
          id: parseInt(item.id, 10),
          name: item.name,
          description: item.description,
          imageURL: item.imageURL,
          class: item.class,
        }));
        this.cards = this.getRandomCards(transformedData, 8); // Seleccionamos 8 cartas únicas
        this.cards = [...this.cards, ...this.cards]; // Duplicamos las cartas para el memorama
        this.shuffleCards();
      });
  }

  getRandomCards(cards: MemoryCard[], count: number): MemoryCard[] {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  shuffleCards(): void {
    this.shuffledCards = [...this.cards].sort(() => Math.random() - 0.5); // Mezclamos las cartas
  }

  flipCard(index: number): void {
    // Si ya tenemos dos cartas volteadas, no hacemos nada
    if (this.flippedCards.length === 2) {
      return;
    }

    // Si no hay ninguna carta volteada, volteamos la primera
    if (this.flippedCards.length === 0) {
      this.flippedCards.push(index);
      this.firstCardIndex = index;
    }
    // Si ya hay una carta volteada y es diferente de la carta seleccionada, volteamos la segunda
    else if (this.flippedCards.length === 1 && this.flippedCards[0] !== index) {
      this.flippedCards.push(index);
      this.secondCardIndex = index;
      this.checkMatch();  // Verificamos si las cartas coinciden
    }
  }

  checkMatch(): void {
    if (this.firstCardIndex !== null && this.secondCardIndex !== null) {
      const firstCard = this.shuffledCards[this.firstCardIndex];
      const secondCard = this.shuffledCards[this.secondCardIndex];

      if (firstCard.name === secondCard.name) {
        // Marcamos las cartas como emparejadas
        this.matchedCards.push(firstCard, secondCard);

        // Actualizamos el estado de las cartas emparejadas
        setTimeout(() => {
          // Agregar la clase matched a las cartas emparejadas
          firstCard['matched'] = true;
          secondCard['matched'] = true;
        }, 500); // Retardo para dar tiempo a la animación
      }

      // Restablecer los índices
      setTimeout(() => {
        this.flippedCards = [];
        this.firstCardIndex = null;
        this.secondCardIndex = null;
      }, 1000);
    }
  }


  isFlipped(card: MemoryCard): boolean {
    // Devuelve true si la carta está volteada o emparejada
    const index = this.shuffledCards.indexOf(card);
    return (
      index === this.firstCardIndex ||
      index === this.secondCardIndex ||
      this.matchedCards.includes(card)
    );
  }

  trackByCardId(index: number, card: any): number {
    return card.id;
  }
}
