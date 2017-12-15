import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as fb from 'firebase';
import { DbPolygon } from '@app/models/dbPolygon.model';

@Injectable()
export class MapService {

  constructor(
    private db: AngularFirestore
  ) { }


  //  Might refactor code to marker and polygon services...

  getMarkers() {
    return this.db.collection('markers2');
  }

  getMarkerById(id: string) {
    return this.getMarkers().doc(id);
  }

  addMarker(marker) {
    let id = this.db.createId();
    marker.id = id;
    return this.getMarkerById(id).set(marker);
  }

  updateMarker(marker) {
    return this.getMarkerById(marker.id).update(marker);
  }

  getPolygons() {
    return this.db.collection('polygons');
  }

  getPolygonById(id: string) {
    return this.getPolygons().doc(id);
  }

  addPolygon(polygon) {
    let id = this.db.createId();
    polygon.id = id;
    //  Nested arrays are not supported in Firestore so:
    polygon.paths = [].concat(...polygon.paths);    
    return this.getPolygonById(id).set(polygon);
  }

  // updatePolygon(polygon) {
  //   return this.getPolygonById(polygon.id).update(polygon);
  // }

  updatePolygonPaths(polygon: DbPolygon) {
    const polyRef = this.getPolygonById(polygon.id).ref;
    let newPolygon = { ...polygon };
    //  Nested arrays are not supported in Firestore so:
    newPolygon.paths = [].concat(...newPolygon.paths);
    polygon.paths = fb.firestore.FieldValue.delete();
    let batch = this.db.firestore.batch();
    batch.update(polyRef, polygon);
    batch.update(polyRef, newPolygon);
    return batch.commit();
  }

  setActivePolygon(polygon) {
    return this.getPolygonById('active').set(polygon);
  }

  deletePolygon(id: string) {
    return this.getPolygonById(id).delete();
  }
}
