import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { emptyCurrencyExchangeRateApiRes } from '../types/currencyExchangeRateApiRes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currencyExchangeRate = emptyCurrencyExchangeRateApiRes();
  constructor(private currency: CurrencyService) {}
  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription = this.currency.currencySubject.subscribe((rates) => {
      this.currencyExchangeRate = rates;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
