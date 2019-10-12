import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AuthService} from './services/auth/auth.service';

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
              private router: Router) {

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
        this.showTabs = true;
      } else {
        this.showTabs = false;
      }
    });

  }

  setTab(index: number) {
    this.tabIndex = index;
  }

}
