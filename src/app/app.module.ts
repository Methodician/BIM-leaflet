import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { MapComponent } from '@components/map/map.component';
import { JsonImportService } from '@services/json-import.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot()
  ],
  providers: [
    JsonImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
