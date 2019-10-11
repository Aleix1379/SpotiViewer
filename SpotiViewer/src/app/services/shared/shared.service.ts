import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly baseApiUrl = 'https://api.spotify.com/v1';

  private data = {};

  constructor() { }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  get(key: string, autoClean = true) {
    const value = this.data[key];
    if (autoClean) {
      delete this.data[key];
    }
    return value;
  }

  public getApiUrl(path?: string) {
    if (path) {
      return `${this.baseApiUrl}/${path}`;
    }
    return this.baseApiUrl;
  }

}
