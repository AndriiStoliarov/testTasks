import { Pipe, PipeTransform } from '@angular/core';

import { Rate } from '../types';

@Pipe({
  name: 'searchCurentRates',
  standalone: false
})
export class SearchCurentRatesPipe implements PipeTransform {

  transform(rates: Rate[]): Rate[] {
    let curentRates;

    curentRates = rates.filter(item => (item.cc === 'USD' || item.cc === 'EUR'));

    return curentRates;
  }

}
