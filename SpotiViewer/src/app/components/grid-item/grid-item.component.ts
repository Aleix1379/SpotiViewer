import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input() album: Album;

  constructor() {
  }

  ngOnInit() {
  }

}
