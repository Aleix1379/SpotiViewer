import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumsService} from '../../services/albums/albums.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {AlbumDetail} from '../../interfaces/album-detail';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../../components/loading/loading.component';
import {TracksResponse} from '../../interfaces/TracksResponse';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  album: AlbumDetail;
  tracksResponse: TracksResponse;
  loadingDialog: any;

  constructor(private route: ActivatedRoute,
              private albumsService: AlbumsService,
              private snackBarService: SnackBarService,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadingDialog = this.dialog.open(LoadingComponent);

      const albumId = params.get('id');
      this.albumsService.getById(albumId).subscribe(
        data => {
          this.loadingDialog.close();
          this.album = {
            id: data.id,
            name: data.name,
            image: data.images[0].url,
            type: data.album_type,
            popularity: data.popularity,
            release_date: data.release_date,
            genres: data.genres,
          };
        },
        error => this.onError(error, `Error donwloading album with id: "${albumId}"`)
      );

      this.albumsService.getAlbumTracks(albumId).subscribe(
        data => {
          console.log('tracks...');
          console.log(data);
          this.tracksResponse = data;
        },
        error => this.onError(error, `Error donwloading album tracks with id: "${albumId}"`)
      );

    });
  }

  private onError(error: any, message: string) {
    this.loadingDialog.close();
    console.error(message);
    console.error(error);
    if (error.status === 401) {
      console.error('token expired...');
      this.snackBarService.show('Token expired...');
      this.localStorageService.removeAccessToken();
      this.router.navigateByUrl('/').catch(console.error);
    } else {
      this.snackBarService.show(message);
    }
  }

}
