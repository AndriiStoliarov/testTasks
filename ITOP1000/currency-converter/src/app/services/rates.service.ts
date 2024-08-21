import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Rate } from '../types';



@Injectable({
  providedIn: 'root'
})
export class RatesService {
  ROOT_URL: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }

  getRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.ROOT_URL).pipe(
      map((response) => response)
    );
  }
}
