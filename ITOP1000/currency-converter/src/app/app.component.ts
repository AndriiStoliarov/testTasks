import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Rate } from './types';
import { RatesService } from './services';



@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Currency converter';
  subtitle = 'Current rate:';
  converterForm: any;
  rates: Rate[] = [];
  currencyRates: Rate[] = [];
  leftCurrentCurrency: string = '';
  rightCurrentCurrency: string = '';
  leftCurrentAmount: number = 0;
  rightCurrentAmount: number = 0;

  private subscription: Subscription = new Subscription();
  private leftCurrencySubscription: Subscription = new Subscription();
  private rightCurrencySubscription: Subscription = new Subscription();
  private leftAmountSubscription: Subscription = new Subscription();
  private rightAmountSubscription: Subscription = new Subscription();

  get leftCurrency(): FormGroup {
    return this.converterForm.get('leftFormFilds.leftCurrency');
  }

  get rightCurrency(): FormGroup {
    return this.converterForm.get('rightFormFilds.rightCurrency');
  }

  get leftAmount(): FormGroup {
    return this.converterForm.get('leftFormFilds.leftAmount');
  }

  get rightAmount(): FormGroup {
    return this.converterForm.get('rightFormFilds.rightAmount');
  }

  constructor(private ratesService: RatesService) { }

  ngOnInit(): void {
    this.createForm();
    this.subscription.add(this.getRates());
    this.leftAmountSubscription.add(this.onLeftAmountChanges());
    this.rightAmountSubscription.add(this.onRightAmountChanges());
    this.leftCurrencySubscription.add(this.onLeftCurrencyChanges());
    this.rightCurrencySubscription.add(this.onRightCurrencyChanges());
  }

  private createForm(): void {
    this.converterForm = new FormGroup({
      leftFormFilds: new FormGroup({
        leftCurrency: new FormControl(null),
        leftAmount: new FormControl(null),
      }),
      rightFormFilds: new FormGroup({
        rightCurrency: new FormControl(null),
        rightAmount: new FormControl(null),
      }),
    })
  }

  private getRates(): Subscription {
    return this.ratesService.getRates().subscribe((records: Rate[]) => {
      this.rates = records;
      this.getCurrencyRates();
    });
  }

  private onLeftCurrencyChanges(): Subscription {
    return this.leftCurrency.valueChanges.subscribe((currentCurrency: string) => {
        this.leftCurrentCurrency = currentCurrency;
        this.convert(currentCurrency, this.rightCurrentCurrency, this.leftCurrentAmount, 'left');
      });
  };

  private onRightCurrencyChanges(): Subscription {
    return this.rightCurrency.valueChanges.subscribe((currentCurrency: string) => {
        this.rightCurrentCurrency = currentCurrency;
        this.convert(currentCurrency, this.leftCurrentCurrency, this.rightCurrentAmount, 'right');
      });
  };

  private onLeftAmountChanges(): Subscription {
    return this.leftAmount.valueChanges.subscribe((currentAmount: number) => {
        this.leftCurrentAmount = currentAmount;
        this.convert(this.leftCurrentCurrency, this.rightCurrentCurrency, currentAmount, 'left');
      });
  };

  private onRightAmountChanges(): Subscription {
    return this.rightAmount.valueChanges.subscribe((currentAmount: number) => {
        this.rightCurrentAmount = currentAmount;
        this.convert(this.rightCurrentCurrency, this.leftCurrentCurrency, currentAmount, 'right');
      });
  };

  private convert(
    leftCurrentRate: string,
    rightCurrentRate: string,
    amount: number,
    isFieldSide: string
  ): void {
    if (leftCurrentRate === '' || rightCurrentRate === '') return;

    const localLeftCurrentRate = this.currencyRates.find(
      item => item.cc === leftCurrentRate
    );

    const localRightCurrentRate = this.currencyRates.find(
      item => item.cc === rightCurrentRate
    );

    const localSum = amount * (localLeftCurrentRate!.rate/localRightCurrentRate!.rate);

    switch(isFieldSide) {
      case 'left':
        this.leftCurrentAmount = localSum;
      break;
      case 'right':
        this.rightCurrentAmount = localSum;
      break;
      default:
        console.log('One of the fields empty!');
    }
  };

  private getCurrencyRates(): void {
    this.currencyRates = this.rates.filter(item => item.cc === 'USD' || item.cc === 'EUR');
    this.currencyRates.unshift({
      "r030": 100,
      "txt": "Українська ривня",
      "rate": 1,
      "cc": "UAH",
      "exchangedate": "01.01.2001"
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.leftCurrencySubscription.unsubscribe();
    this.rightCurrencySubscription.unsubscribe();
    this.leftAmountSubscription.unsubscribe();
    this.rightAmountSubscription.unsubscribe();
  }
}
