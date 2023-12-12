import {
  NgModule, Component, enableProdMode, AfterViewInit,
} from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxFormModule,
} from 'devextreme-angular';

import { DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';
import { Employee, Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  providers: [Service],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
})

export class AppComponent implements AfterViewInit {
  employee: Employee;

  isHomeAddressVisible: boolean;

  checkBoxOptions: Record<string, unknown>;

  phoneOptions: Record<string, unknown>[] = [];

  addPhoneButtonOptions: Record<string, unknown>;

  constructor(service: Service) {
    this.employee = service.getEmployee();
    this.isHomeAddressVisible = true;

    this.phoneOptions = this.getPhonesOptions(this.employee.Phones);

    this.checkBoxOptions = {
      text: 'Show Address',
      value: true,
      onValueChanged: (e: DxCheckBoxTypes.ValueChangedEvent) => {
        this.isHomeAddressVisible = e.component.option('value');
      },
    };

    this.addPhoneButtonOptions = {
      icon: 'add',
      text: 'Add phone',
      onClick: () => {
        this.employee.Phones.push('');
        this.phoneOptions = this.getPhonesOptions(this.employee.Phones);
      },
    };
  }

  ngAfterViewInit(): void {}

  getPhonesOptions = (phones: string[]) => phones.map((_, index) => this.generateNewPhoneOptions(index));

  generateNewPhoneOptions(index: number) {
    return {
      mask: '+1 (X00) 000-0000',
      maskRules: { X: /[01-9]/ },
      buttons: [{
        name: 'trash',
        location: 'after',
        options: {
          stylingMode: 'text',
          icon: 'trash',
          onClick: () => {
            this.employee.Phones.splice(index, 1);
            this.phoneOptions = this.getPhonesOptions(this.employee.Phones);
          },
        },
      }],
    };
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    DxFormModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
