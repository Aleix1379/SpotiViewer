import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://accounts.spotify.com/authorize';
  private currentUrl: string;

  private static formatScopes(scopes: string[]): string {
    return encodeURIComponent(scopes.join(' '));
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.currentUrl = this.document.location.href;
  }

  /*
  playlist-read-collaborative
  playlist-modify-private
  playlist-modify-public
  playlist-read-private
  Spotify Connect
  user-modify-playback-state
  user-read-currently-playing
  user-read-playback-state
  Users
  user-read-private
  user-read-email
  Library
  user-library-modify
  user-library-read
  Follow
  user-follow-modify
  user-follow-read
  Listening History
  user-read-recently-played
  user-top-read
  Playback
  streaming
  app-remote-control
  */

  private getRedirectUrl(): string {
    if (this.currentUrl.startsWith('http://localhost:4200')) {
      return 'http://localhost:4200';
    } else {
      return 'https://www.spoti-viewer.aleixmp.com/';
    }
  }

  public getAuthorizeUrl(): string {
    return `${this.authUrl}` +
      `?client_id=c24d5ce45e8944e9801a4daef73a62d7` +
      `&redirect_uri=${this.getRedirectUrl()}` +
      `&scope=${AuthService.formatScopes(
        [
          'user-read-private',
          'streaming',
          'user-follow-read',
          'user-library-read',
          'user-read-email',
          'user-read-private',
        ]
      )}` +
      `&response_type=token` +
      `&state=123`;
  }
}
