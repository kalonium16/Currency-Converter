import { Pipe, PipeTransform } from '@angular/core';

//to swap currencies from X UAH = X USD to X USD = X UAH
@Pipe({
  name: 'switchCurrency',
})
export class SwitchCurrencyPipe implements PipeTransform {
  transform(value: number): number {
    return 1 / value;
  }
}
