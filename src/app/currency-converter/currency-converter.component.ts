import { Component, OnInit, OnDestroy } from '@angular/core';
import { emptyCurrencyExchangeRateApiRes } from '../types/currencyExchangeRateApiRes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  currencyExchangeRate = emptyCurrencyExchangeRateApiRes();
  exchengeRate = this.currency.getExchangeRate('UAH', 'USD');
  converter = new FormGroup({
    firstCurrency: new FormControl('UAH'),
    firstCurrencyAmount: new FormControl(100),
    secondCurrency: new FormControl('USD'),
    secondCurrencyAmount: new FormControl(1),
  });
  subscription: Subscription = new Subscription();

  constructor(private currency: CurrencyService) {
    this.converter.valueChanges.subscribe((change) => {
      this.exchengeRate = this.currency.getExchangeRate(
        this.converter.controls.firstCurrency.getRawValue(),
        this.converter.controls.secondCurrency.getRawValue()
      );
    });
  }

  ngOnInit(): void {
    this.subscription = this.currency.currencySubject.subscribe((rates) => {
      this.exchengeRate = this.currency.getExchangeRate('UAH', 'USD');
      this.currencyExchangeRate = rates;
      this.setSecondCurrency();
    });
  }

  exchengeFirstCurrency(amount: number | null | undefined) {
    if (!amount) {
      return 0;
    }
    return +(amount * this.exchengeRate).toFixed(2);
  }

  exchengeSecondCurrency(amount: number | null | undefined) {
    if (!amount) {
      return 0;
    }
    return +(amount * (1 / this.exchengeRate)).toFixed(2);
  }

  setFirstCurrency() {
    this.converter.controls.firstCurrencyAmount.setValue(
      this.exchengeSecondCurrency(
        this.converter.controls.secondCurrencyAmount.getRawValue()
      )
    );
  }

  setSecondCurrency() {
    this.converter.controls.secondCurrencyAmount.setValue(
      this.exchengeFirstCurrency(
        this.converter.controls.firstCurrencyAmount.getRawValue()
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
