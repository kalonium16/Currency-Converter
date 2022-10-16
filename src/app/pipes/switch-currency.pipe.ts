import { Pipe, PipeTransform } from '@angular/core';

//to swap currencies from X UAH = X USD to X USD = X UAH
@Pipe({
  name: 'switchCurrency',
})
export class SwitchCurrencyPipe implements PipeTransform {
  transform(value: number): number {
    if (value === 0) {
      return 0;
    }
    return 1 / value;
  }
}
