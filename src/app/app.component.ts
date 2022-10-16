import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = new Subscription();
  title = 'Currency-Converter';
  isLoaded = false;

  constructor(private currency: CurrencyService) {
    currency.fetchCurrencyExchangeRate();
    this.currency.currencySubject.subscribe((rates) => {
      if (rates.success) {
        this.isLoaded = true;
      }
    });
  }
}
