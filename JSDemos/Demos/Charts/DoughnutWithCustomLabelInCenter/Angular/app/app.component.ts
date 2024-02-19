import { NgModule, Component, enableProdMode } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DxHttpModule } from 'DxHttpModule';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular';
import { DecimalPipe } from '@angular/common';
import { DataItem, Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [Service],
})

export class AppComponent {
  service: Service;

  countries: Iterable<string>;

  pipe = new DecimalPipe('en-US');

  constructor(service: Service) {
    this.service = service;
    this.countries = new Set(service.getData().map((item) => item.country));
  }

  customizeLabel(e) {
    return `${e.argumentText}\n${e.valueText}`;
  }

  calculateTotal(pieChart) {
    const totalValue = pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0);
    return this.pipe.transform(totalValue, '1.0-0');
  }

  getImagePath(country) {
    return `../../../../images/flags/${country.replace(/\s/, '').toLowerCase()}.svg`;
  }
}

@NgModule({
  imports: [
    DxHttpModule,
    BrowserModule,
    BrowserTransferStateModule,
    DxPieChartModule,
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
