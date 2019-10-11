import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from './services/localStorage/local-storage.service';
import {DOCUMENT} from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import {AlbumsService} from './services/albums/albums.service';
import {UsersService} from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpotiViewer';
  tabIndex = 1;
  showTabs = true;
  currentPath: string;

  constructor(@Inject(DOCUMENT) private document: Document,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private albumsService: AlbumsService,
              private usersService: UsersService) {

    // let accessTokenSaved = this.localStorageService.getAccessToken();
    //
    // if (!accessTokenSaved) {
    //   this.router.navigateByUrl('login').catch(console.error);
    // }

    router.events.subscribe(() => {
      this.currentPath = router.url;
      if (router.url === '/albums') {
        this.tabIndex = 1;
        this.showTabs = true;
      } else if (router.url === '/artists') {
        this.tabIndex = 2;
        this.showTabs = true;
      } else if (router.url === '/profile') {
        this.tabIndex = 3;
      } else {
        this.showTabs = false;
      }
    });

/*    accessTokenSaved = this.localStorageService.getAccessToken();

    if (accessTokenSaved) {
      // I have access token -> go to tabs page
      console.log('I have access token -> go to tabs page');
      this.router.navigateByUrl('/').catch(console.error);
    } else {
      // I don't have access token the user has to authorize this app

      console.log('Params:');
      const url = this.router.url;

      console.log(`URL: ${url}`);

      if (!url.includes('access_token')) {
        return;
      }

      const startToken = url.indexOf('access_token') + 13;
      const endToken = url.indexOf('&', startToken);

      const accessToken = url.substring(startToken, endToken);

      console.log('Access Token:');
      console.log(accessToken);

      this.localStorageService.setAccessToken(accessToken);

      this.usersService.getUserData().subscribe(
        user => {
          console.log('ME:');
          console.log(user);
          this.usersService.getPlaylists(user.id).subscribe(
            playlists => {
              console.log('playlists:');
              console.log(playlists);
              const playlistId = playlists.items[0].id;

              this.usersService.getPlaylist(user.id, playlistId).subscribe(
                playlist => {
                  console.log('playlist:::');
                  console.log(playlist);
                }
              );

            }
          );
        },
        error => console.error(error)
      );

      this.albumsService.getAll().subscribe(
        data => {
          console.log('Albums:');
          console.log(data);
        },
        error => {
          console.log('error downloading albums...');
          console.error(error);
        }
      );
    }*/

  }

  setTab(index: number) {
    this.tabIndex = index;
  }

  authorize() {
    console.log(`authorize...`);
    console.log(`this.authService.getAuthorizeUrl(): ${this.authService.getAuthorizeUrl()}`);
    this.document.location.href = this.authService.getAuthorizeUrl();
  }

}
