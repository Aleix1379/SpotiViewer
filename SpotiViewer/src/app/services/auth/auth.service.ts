import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://accounts.spotify.com/authorize';

  constructor() {
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

  public getAuthorizeUrl(): string {
    return `${this.authUrl}` +
      `?client_id=c24d5ce45e8944e9801a4daef73a62d7` +
      `&redirect_uri=http://localhost:4200` +
      `&scope=user-read-private%20user-read-email%20user-library-read` +
      `&response_type=token` +
      `&state=123`;
  }
}
