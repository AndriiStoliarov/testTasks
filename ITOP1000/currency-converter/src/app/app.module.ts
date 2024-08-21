import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RemoveCommasPipe, SearchCurentRatesPipe } from './pipes';

import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



const matModules = [
  MatCommonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SearchCurentRatesPipe,
    RemoveCommasPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
