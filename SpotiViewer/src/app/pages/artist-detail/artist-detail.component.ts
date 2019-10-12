import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from '../../components/loading/loading.component';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {LocalStorageService} from '../../services/localStorage/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtistsService} from '../../services/artists/artists.service';
import {ArtistDetail} from '../../interfaces/artist-detail';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artist: ArtistDetail;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBarService: SnackBarService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private artistsService: ArtistsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const dialog = this.dialog.open(LoadingComponent);

      const artistId = params.get('id');
      this.artistsService.getById(artistId).subscribe(
        data => {
          dialog.close();
          this.artist = {
            id: data.id,
            name: data.name,
            image: data.images[0].url,
            type: data.type,
            popularity: data.popularity,
            genres: data.genres,
          };
        },
        error => {
          dialog.close();
          console.error(`Error donwloading album with id: "${artistId}"`);
          console.error(error);
          if (error.status === 401) {
            console.error('token expired...');
            this.snackBarService.show('Token expired...');
            this.localStorageService.removeAccessToken();
            this.router.navigateByUrl('/').catch(console.error);
          } else {
            this.snackBarService.show(`Error donwloading album with id: "${artistId}"`);
          }
        }
      );
    });

  }

}
