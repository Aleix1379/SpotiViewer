import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {MatDialog} from '@angular/material';
import {User} from '../../interfaces/user';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private router: Router,
              private localStorageService: LocalStorageService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const dialog = this.dialog.open(LoadingComponent);
    this.usersService.getUserData().subscribe(
      data => {
        dialog.close();
        this.user = data;
      },
      error => {
        dialog.close();
        console.log('error downloading user profile...');
        console.error(error);
        if (error.status === 401) {
          console.error('token expired...');
          this.snackBarService.show('Token expired');
          this.localStorageService.removeAccessToken();
          this.router.navigateByUrl('/').catch(console.error);
        } else {
          this.snackBarService.show('Error downloading user profile');
        }
      }
    );
  }

  logout() {
    this.localStorageService.clearAll();
    this.router.navigateByUrl('/').catch(console.error);
  }

}
