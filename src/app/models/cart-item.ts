import { CurrencyFormat } from '../global/currency-format';
import { CardInfo } from './card-info';

export class CartItem {
    id: number;
    image: string;
    name: string;
    subName: string;
    price: number;
    quantity: number;
}
