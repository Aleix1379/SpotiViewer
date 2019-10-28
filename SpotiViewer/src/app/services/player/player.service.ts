import {Injectable, NgZone} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../localStorage/local-storage.service';
import {SnackBarService} from '../snackBar/snack-bar.service';
import {Router} from '@angular/router';
// @ts-ignore
import SpotifyPlayer = Spotify.SpotifyPlayer;

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private player: SpotifyPlayer;

  constructor(private http: HttpClient,
              private sharedService: SharedService,
              private localStorageService: LocalStorageService,
              private snackBarService: SnackBarService,
              private router: Router,
              private zone: NgZone) {
  }


  public loadSpotify() {
    console.log('player service...');

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.localStorageService.getAccessToken();
      // @ts-ignore
      this.player = new Spotify.Player({
        name: 'SpotiViewer Player',
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      this.player.addListener('initialization_error', ({message}) => {
        console.error(message);
      });
      this.player.addListener('authentication_error', ({message}) => {
        console.error(message);
        console.error('token expired ====>');
        this.zone.run(() => {
          this.snackBarService.show('Token expired...');
          this.localStorageService.removeAccessToken();
          this.router.navigateByUrl('/').catch(console.error);
        });
      });
      this.player.addListener('account_error', ({message}) => {
        console.error(message);
      });
      this.player.addListener('playback_error', ({message}) => {
        console.error(message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', state => {
        console.log(state);
      });

      // Ready
      this.player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      this.player.connect()
        .then((data) => console.log('connect ok: ' + data))
        .catch(error => console.log('connect error: ' + error));
    };
  }

  public play(uri: string) {
    const play = ({
                    spotify_uri,
                    playerInstance: {
                      _options: {
                        getOAuthToken,
                        id
                      }
                    }
                  }) => {
      getOAuthToken(accessToken => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({uris: [spotify_uri]}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
        }).catch(error => {
          console.log('error play...');
          console.log(error);
        });
      });
    };

    play({
      playerInstance: this.player,
      spotify_uri: uri // 'spotify:track:35JkHIoDcTKrgi2ncXrPBh'
    });
  }

  public togglePlay() {
    this.player.togglePlay().catch(error => {
      console.log('errro toggle play');
      console.log(error);
    });
  }

  public resume() {
    this.player.resume().catch(error => {
      console.log('errro resume');
      console.log(error);
    });
  }

}
