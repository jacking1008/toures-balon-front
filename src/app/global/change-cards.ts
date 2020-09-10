import { CardInfo } from '../models/card-info';
import { Show } from '../models/show';

export class ChangeCards {

    static showToCard(shows:Show[]):CardInfo[]{
        return shows.map( e => {
            let card = new CardInfo();
            card.id = e.id;
            card.subtitle = e.category;
            card.detail = e.description;
            card.title = e.name;
            card.price = e.price;
            card.category = 'show';
            card.subtitle = e.category;
            card.image = e.image;
            return card;
        });
    }
}
