import { NgModule, Component, enableProdMode } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DxHttpModule } from 'DxHttpModule';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxBarGaugeModule } from 'devextreme-angular';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
})

export class AppComponent {
  customizeText(arg) {
    return `${arg.valueText} mm`;
  }
}

@NgModule({
  imports: [
    DxHttpModule,
    BrowserModule,
    BrowserTransferStateModule,
    DxBarGaugeModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
