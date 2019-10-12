import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly myUserUrl = this.sharedService.getApiUrl('me');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(this.myUserUrl);
  }

}
