export class CurrencyFormat {

    private static currencies = [
        {
            locale : 'en-US',
            currency: 'USD'
        }
    ]

    static convertFormatting(currency:string,value:number){
        let cur = this.currencies.filter( e => e.currency = currency );
        var formatter = new Intl.NumberFormat(cur[0].locale, {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(value);
    }
}
