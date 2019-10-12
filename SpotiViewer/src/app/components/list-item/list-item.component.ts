import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../interfaces/album';
import {Artist} from '../../interfaces/artist';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
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
