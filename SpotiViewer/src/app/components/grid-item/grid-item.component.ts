import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../interfaces/album';
import {Artist} from '../../interfaces/artist';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input() data: Album | Artist;
  @Input() type: 'album' | 'artist';

  detailsLabel: string;

  constructor() {
  }

  ngOnInit() {
    if (this.type === 'album') {
      this.detailsLabel = 'Artists';
    } else if (this.type === 'artist') {
      this.detailsLabel = 'Genres';
    }
  }

}
