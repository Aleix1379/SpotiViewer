import {Component, Input, OnInit} from '@angular/core';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() album: Album;

  constructor() { }

  ngOnInit() {
  }

}
