import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isGridFormat: boolean;
  @Output() onToggleGridFormat = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleGridFormat() {
    this.isGridFormat = !this.isGridFormat;
    this.onToggleGridFormat.emit(this.isGridFormat);
  }

}
