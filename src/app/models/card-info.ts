import { Url } from 'url';
import { CurrencyFormat } from '../global/currency-format';

export class CardInfo {
    image: string;
    category; string;
    title: string;
    subtitle: string;
    description: string;
    price: number[];
    detail: string;

    getFullPrice(){
        let rta = "";
        for (let index = 0; index < this.price.length; index++) {
            rta += index == this.price.length -1 ? CurrencyFormat.convertFormatting('USD', this.price[index]) : CurrencyFormat.convertFormatting('USD', this.price[index])  + " - ";
        }
        return rta;
    }
}
