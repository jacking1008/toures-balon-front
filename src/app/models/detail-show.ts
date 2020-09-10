import { CurrencyFormat } from '../global/currency-format';
import { CardInfo } from './card-info';
import { Locality } from './locality';

export class DetailShow {
    id: number;
    image: string;
    imageLocalities: string;
    name: string;
    description: string;
    place: string;
    city: string;
    date: Date;
    category: string;
    capacity: number;
    localities: Locality[];
}
