import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() color: 'green' | 'red';
  @Output() btnPressed = new EventEmitter();

  backgroundColor: string;

  constructor() {
  }

  ngOnInit() {
    if (this.color === 'green') {
      this.backgroundColor = '#4CAF50';
    } else if (this.color === 'red') {
      this.backgroundColor = '#F44336';
    }
  }

  onClick() {
    this.btnPressed.emit();
  }

}
