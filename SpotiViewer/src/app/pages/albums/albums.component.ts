import {Component, OnInit} from '@angular/core';
import {AlbumsService} from '../../services/albums/albums.service';
import {Album} from '../../interfaces/album';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../../components/loading/loading.component';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];
  isGridFormat = true;

  constructor(private albumsService: AlbumsService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private dialog: MatDialog,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const isGridFormat = this.localStorageService.getIsGridFormat();
    if (isGridFormat !== null) {
      this.isGridFormat = isGridFormat;
    }

    const dialog = this.dialog.open(LoadingComponent);
    this.albumsService.getAll().subscribe(
      data => {
        dialog.close();
        console.log('Albums:');
        console.log(data);
        this.albums = data.items.map(item => {
          return {
            id: item.album.id,
            name: item.album.name,
            image: item.album.images[0].url,
            popularity: item.album.popularity,
            artists: item.album.artists.map(artist => artist.name).join(', ')
          };
        });
      },
      error => {
        dialog.close();
        console.log('error downloading albums...');
        console.error(error);
        if (error.status === 401) {
          console.error('token expired...');
          this.snackBarService.show('Token expired...');
          this.localStorageService.removeAccessToken();
          this.router.navigateByUrl('/').catch(console.error);
        }
      }
    );
  }

  goToDetail(albumId: string) {
    this.router.navigateByUrl(`/albums/${albumId}`).catch(console.error);
  }

  toggleGridFormat() {
    this.isGridFormat = !this.isGridFormat;
    this.localStorageService.setIsGridFormat(this.isGridFormat);
  }

}
