import { CardInfo } from '../models/card-info';
import { Show } from '../models/show';

export class ChangeCards {

    static showToCard(shows:Show[]):CardInfo[]{
        return shows.map( e => {
            let card = new CardInfo();
            debugger
            card.subtitle = e.category;
            card.detail = e.description;
            card.title = e.name;
            card.price = e.price;
            card.category = 'Espectaculo';
            card.subtitle = e.category;
            card.image = e.image;
            return card;
        });
    }
}
