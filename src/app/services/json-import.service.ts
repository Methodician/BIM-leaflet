import { Injectable } from '@angular/core';

import * as data from 'assets/natural-earth-mapshaper/ne_10m_admin_0_countries.json';

@Injectable()
export class JsonImportService {

  constructor() { }

  getData(){
    let output = <any>data;
    return output;
  }
}
