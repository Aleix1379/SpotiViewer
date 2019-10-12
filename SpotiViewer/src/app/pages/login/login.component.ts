import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    const accessTokenSaved = this.localStorageService.getAccessToken();

    if (accessTokenSaved) {
      // I have access token -> go to tabs page
      this.router.navigateByUrl('/albums').catch(console.error);
    } else {
      // I don't have access token the user has to authorize this app

      const url = this.router.url;

      if (!url.includes('access_token')) {
        return;
      }

      const startToken = url.indexOf('access_token') + 13;
      const endToken = url.indexOf('&', startToken);

      const accessToken = url.substring(startToken, endToken);
      this.localStorageService.setAccessToken(accessToken);
      this.router.navigateByUrl('/albums').catch(console.error);
    }
  }

  authorize() {
    this.document.location.href = this.authService.getAuthorizeUrl();
  }

}
