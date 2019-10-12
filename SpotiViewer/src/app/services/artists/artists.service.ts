import {Injectable} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private readonly myArtistsUrl = this.sharedService.getApiUrl('me/following?type=artist');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.myArtistsUrl);
  }

}
