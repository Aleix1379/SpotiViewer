import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly myUserUrl = this.sharedService.getApiUrl('me');
  private readonly usersUrl = this.sharedService.getApiUrl('users');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getUserData(): Observable<any> {
    return this.http.get(this.myUserUrl);
  }

  getPlaylists(userId: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${userId}/playlists`);
  }

  getPlaylist(userId, playlistId: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${userId}/playlists/${playlistId}`);
  }

}
