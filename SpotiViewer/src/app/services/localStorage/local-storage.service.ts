import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * value = storage[key]
   */
  private static getItem<T>(key: string): T {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater
   * than or equal to the number of key/value pairs in the object.
   */
  private static key(index: number): string | null {
    return localStorage.key(index);
  }

  /**
   * delete storage[key]
   */
  private static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * storage[key] = value
   */
  private static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  constructor() {
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  private static clearAll(): void {
    localStorage.clear();
  }

  public getAccessToken(): string {
    return LocalStorageService.getItem('access-token');
  }

  public setAccessToken(authToken: string): void {
    LocalStorageService.setItem('access-token', authToken);
  }

  public removeAccessToken() {
    LocalStorageService.removeItem('access-token');
  }

  public getIsAlbumsGridFormat(): boolean {
    return LocalStorageService.getItem('is-grid-albums-format');
  }

  public setIsAlbumsGridFormat(isGridFormat: boolean): void {
    LocalStorageService.setItem('is-grid-albums-format', isGridFormat);
  }

  public removeGetIsAlbumsGridFormat() {
    LocalStorageService.removeItem('is-grid-albums-format');
  }

  public getIsArtistsGridFormat(): boolean {
    return LocalStorageService.getItem('is-grid-artists-format');
  }

  public setIsArtistsGridFormat(isGridFormat: boolean): void {
    LocalStorageService.setItem('is-grid-artists-format', isGridFormat);
  }

  public removeGetIsArtistsGridFormat() {
    LocalStorageService.removeItem('is-grid-artists-format');
  }

  public clearAll() {
    LocalStorageService.clearAll();
  }

}
