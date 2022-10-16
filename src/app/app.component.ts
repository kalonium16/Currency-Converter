import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Currency-Converter';
  constructor(private currency: CurrencyService) {
    currency.fetchCurrencyExchangeRate();
  }
}
