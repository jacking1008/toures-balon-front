import { Component, OnInit, Input } from '@angular/core';
import { CardInfo } from 'src/app/models/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() public information : CardInfo;

  constructor() { }

  ngOnInit() {
  }

}
