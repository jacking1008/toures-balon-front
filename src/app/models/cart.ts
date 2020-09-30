import { CurrencyFormat } from '../global/currency-format';
import { CardInfo } from './card-info';
import { CartItem } from './cart-item';

export class Cart {
    eventList: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}
