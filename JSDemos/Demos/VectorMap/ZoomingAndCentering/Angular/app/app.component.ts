import {
  NgModule, Component, ViewChild, enableProdMode,
} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DxHttpModule } from 'DxHttpModule';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxVectorMapComponent, DxVectorMapModule, DxButtonModule } from 'devextreme-angular';
import * as mapsData from 'devextreme-dist/js/vectormap-data/world.js';
import { Marker, Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  providers: [Service],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
})

export class AppComponent {
  @ViewChild(DxVectorMapComponent, { static: false }) vectorMap: DxVectorMapComponent;

  worldMap = mapsData.world;

  markers: Marker[];

  constructor(service: Service) {
    this.markers = service.getMarkers();
  }

  customizeTooltip(arg) {
    if (arg.layer.type === 'marker') {
      return {
        text: arg.attribute('name'),
      };
    }
  }

  markerClick({ target, component }) {
    if (target?.layer.type === 'marker') {
      component.center(target.coordinates()).zoomFactor(10);
    }
  }

  resetClick() {
    this.vectorMap.instance.center(null);
    this.vectorMap.instance.zoomFactor(null);
  }
}

@NgModule({
  imports: [
    DxHttpModule,
    BrowserModule,
    BrowserTransferStateModule,
    DxVectorMapModule,
    DxButtonModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
