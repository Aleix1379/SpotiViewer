import {Component, Input, OnInit} from '@angular/core';
import {Artist, Track, TracksResponse} from '../../interfaces/TracksResponse';
import {PlayerService} from '../../services/player/player.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  @Input() tracksResponse: TracksResponse;

  tracks: Track[];
  artists: Artist[];
  currentTrackId: string;
  isPlaying = false;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.tracks = this.tracksResponse.items;
  }

  play(track: Track) {
    if (track.id === this.currentTrackId) {
      console.log('resume...');
      this.playerService.resume();
    } else {
      console.log('play...');
      this.playerService.play(track.uri);
    }
    this.currentTrackId = track.id;
    this.isPlaying = true;
  }

  pause() {
    console.log('pause...');
    this.playerService.togglePlay();
    this.isPlaying = false;
  }

}
