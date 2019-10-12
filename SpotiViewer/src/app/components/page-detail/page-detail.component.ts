import {Component, Input, OnInit} from '@angular/core';
import {AlbumDetail} from '../../interfaces/album-detail';
import {ArtistDetail} from '../../interfaces/artist-detail';

interface PageDetailItem {
  label: string;
  value: string | string[];
}

interface PageDetailData {
  name: string;
  image: string;
  details: PageDetailItem [];
}

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {
  @Input() data: AlbumDetail | ArtistDetail;

  detail: PageDetailData;

  constructor() {
  }

  ngOnInit() {
    this.detail = {
      name: this.data.name,
      image: this.data.image,
      details: [
        {
          label: 'Release date',
          value: this.data.type
        },
        {
          label: 'Genres',
          value: this.data.genres
        }
      ]
    };

    if ('release_date' in this.data) {
      this.detail.details.push({
        label: 'Type',
        value: this.data.release_date
      });
    }

  }

}
