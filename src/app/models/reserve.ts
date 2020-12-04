import { Payment } from './payment';
import { ProductItem } from './product-item';
import { UserPayment } from './user-pay';

export class Reserve {
    usuario: UserPayment;
    payment: Payment;
    productList: ProductItem[];
    referencia: number;
    total: number;
}
