import { Injectable } from '@angular/core';

export enum LocalKeys {
  token = 'S3cret0',
}

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  static getElement(key: LocalKeys): string | null {
    return localStorage.getItem(key);
  }

  static setElement(key: LocalKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  static clearStorage(): void {
    localStorage.clear();
  }
}
