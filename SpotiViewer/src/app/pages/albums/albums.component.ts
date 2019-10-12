import {Component, OnInit} from '@angular/core';
import {AlbumsService} from '../../services/albums/albums.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../../components/loading/loading.component';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {Album} from '../../interfaces/album';

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
    const isGridFormat = this.localStorageService.getIsAlbumsGridFormat();
    if (isGridFormat !== null) {
      this.isGridFormat = isGridFormat;
    }

    const dialog = this.dialog.open(LoadingComponent);
    this.albumsService.getAll().subscribe(
      data => {
        dialog.close();
        this.albums = data.items.map(item => {
          return {
            id: item.album.id,
            name: item.album.name,
            image: item.album.images[0].url,
            popularity: item.album.popularity,
            details: item.album.artists.map(artist => artist.name).join(', ')
          };
        });
      },
      error => {
        dialog.close();
        console.log('error downloading albums...');
        console.error(error);
        if (error.status === 401) {
          console.error('token expired...');
          this.snackBarService.show('Token expired');
          this.localStorageService.removeAccessToken();
          this.router.navigateByUrl('/').catch(console.error);
        } else {
          this.snackBarService.show('Error downloading your albums');
        }
      }
    );
  }

  goToDetail(albumId: string) {
    this.router.navigateByUrl(`/albums/${albumId}`).catch(console.error);
  }

  toggleGridFormat() {
    this.isGridFormat = !this.isGridFormat;
    this.localStorageService.setIsAlbumsGridFormat(this.isGridFormat);
  }

}
