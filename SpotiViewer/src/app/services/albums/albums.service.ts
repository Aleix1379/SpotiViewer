import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private readonly myAlbumsUrl = this.sharedService.getApiUrl('me/albums');
  private readonly albumsUrl = this.sharedService.getApiUrl('albums');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.myAlbumsUrl);
  }

  getById(albumId: string): Observable<any> {
    return this.http.get(`${this.albumsUrl}/${albumId}`);
  }

}
