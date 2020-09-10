import { Component, OnInit } from '@angular/core';
import { ShowService } from '../services/show.service';
import { Show } from '../models/show';
import { ChangeCards } from '../global/change-cards';
import { CardInfo } from '../models/card-info';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  shows: Show[];
  cards: CardInfo[];

  constructor(
    private eventSrv : ShowService
  ) { }

  ngOnInit() {
    this.eventSrv.cargarData().subscribe( rta => {
      this.shows = rta;
      this.cards = this.getCards();
    })
  }

  getCards(){
    return ChangeCards.showToCard(this.shows);
  }

}
