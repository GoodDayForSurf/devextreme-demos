import { Injectable } from '@angular/core';
import { DxChartTypes } from 'devextreme-angular/ui/chart';

export class DataItem {
  arg: string;

  val: number;
}

@Injectable()
export class Service {
  getData(): DataItem[] {
    return new Array(20).fill(1).map((val, index) => ({
      arg: `Item${index}`,
      val,
    }));
  }

  getPaletteCollection(): DxChartTypes.Properties['palette'][] {
    return ['Material', 'Soft Pastel', 'Harmony Light', 'Pastel', 'Bright', 'Soft', 'Ocean', 'Office', 'Vintage', 'Violet', 'Carmine', 'Dark Moon', 'Soft Blue', 'Dark Violet', 'Green Mist'];
  }

  getPaletteExtensionModes(): DxChartTypes.Properties['paletteExtensionMode'][] {
    return ['alternate', 'blend', 'extrapolate'];
  }
}
