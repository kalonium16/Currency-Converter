import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  currencyExchangeRateApiRes,
  emptyCurrencyExchangeRateApiRes,
} from '../types/currencyExchangeRateApiRes';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiKey = '9RJi0H09QYcrUHJwvWYMmshbqdLXwXJ6';
  currencyExchangeRate = emptyCurrencyExchangeRateApiRes();
  currencySubject = new Subject<currencyExchangeRateApiRes>();

  constructor(private http: HttpClient) {}

  fetchCurrencyExchangeRate() {
    const httpOptions = {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      }),
    };
    this.http
      .get<currencyExchangeRateApiRes>(
        'https://api.apilayer.com/exchangerates_data/latest?base=UAH',
        httpOptions
      )
      .subscribe((res) => {
        this.currencyExchangeRate = res;
        this.currencySubject.next(res);
      });
  }

  getFakeCurrencyExchangeRate() {
    return emptyCurrencyExchangeRateApiRes();
  }
  // Due to the fact that free API gives set amount of requests for the month we get an exchange rate of another currencies with the UAH as base.
  getExchangeRate(
    first: string | null | undefined,
    second: string | null | undefined
  ) {
    if (!first || !second) {
      return 1;
    }
    if (this.currencyExchangeRate.base === first) {
      return this.currencyExchangeRate.rates[
        second as keyof typeof this.currencyExchangeRate.rates
      ];
    } else if (this.currencyExchangeRate.base === second) {
      return (
        1 /
        this.currencyExchangeRate.rates[
          first as keyof typeof this.currencyExchangeRate.rates
        ]
      );
    } else {
      return (
        this.currencyExchangeRate.rates[
          first as keyof typeof this.currencyExchangeRate.rates
        ] /
        this.currencyExchangeRate.rates[
          second as keyof typeof this.currencyExchangeRate.rates
        ]
      );
    }
  }
}
