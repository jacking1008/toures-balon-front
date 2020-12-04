import { PayResponse } from './pay-response';
import { ProductItem } from './product-item';
import { UserPayment } from './user-pay';

export class ReserveResponse {
    usuario: UserPayment;
    pagoResponse: PayResponse;
    productList: ProductItem[];
    reservaStatus: string;
}
