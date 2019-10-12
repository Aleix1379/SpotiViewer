import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {MatDialog} from '@angular/material';
import {ArtistsService} from '../../services/artists/artists.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {Router} from '@angular/router';
import {Artist} from '../../interfaces/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists: Artist[];
  isGridFormat = true;

  constructor(private localStorageService: LocalStorageService,
              private dialog: MatDialog,
              private router: Router,
              private snackBarService: SnackBarService,
              private artistsService: ArtistsService) {
  }

  ngOnInit() {
    const isGridFormat = this.localStorageService.getIsArtistsGridFormat();
    if (isGridFormat !== null) {
      this.isGridFormat = isGridFormat;
    }

    const dialog = this.dialog.open(LoadingComponent);
    this.artistsService.getAll().subscribe(
      data => {
        dialog.close();
        this.artists = data.artists.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            image: item.images[0].url,
            popularity: item.popularity,
            details: item.genres.length === 0 ? 'There is no genres' : item.genres.join(', ')
          };
        });
      },
      error => {
        dialog.close();
        console.log('error dowloading artists...');
        console.error(error);
        if (error.status === 401) {
          console.error('token expired...');
          this.snackBarService.show('Token expired');
          this.localStorageService.removeAccessToken();
          this.router.navigateByUrl('/').catch(console.error);
        } else {
          this.snackBarService.show('Error downloading your artists');
        }
      }
    );

  }

  toggleGridFormat() {
    this.isGridFormat = !this.isGridFormat;
    this.localStorageService.setIsArtistsGridFormat(this.isGridFormat);
  }

  goToArtistDetail(artistId: string) {
    this.router.navigateByUrl(`/artists/${artistId}`).catch(console.error);
  }

}
