import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { AppComponent } from './app.component';
import { MapComponent } from '@components/map/map.component';
import { MapDrawComponent } from './components/map-draw/map-draw.component';

// import { JsonImportService } from '@services/json-import.service';
import { MapService } from '@app/services/map.service';
import { environment } from 'environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapDrawComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig, 'bim-earth'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [
    // JsonImportService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
