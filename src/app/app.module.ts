import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { AppComponent } from './app.component';
import { MapComponent } from '@components/map/map.component';
import { JsonImportService } from '@services/json-import.service';
import { MapDrawComponent } from './components/map-draw/map-draw.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDrawComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [
    JsonImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
