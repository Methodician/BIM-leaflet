import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, MarkerOptions, icon, geoJSON } from 'leaflet';
import { JsonImportService } from '@app/services/json-import.service';

@Component({
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  seedData;

  mapOptions = {
    layers: [
      tileLayer(
        'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...'}
      )
    ],
    zoom: 13,
    // center: latLng(45.473865, -122.719355)
    center: latLng(46.879966, -121.726909)
  };

  layersControl = {
    baseLayers: {
        'Open Street Map DE': tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Cycle Map': tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=7b61fd908c5243cdb236f35223f63feb', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
        'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
        'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

  markerOptions: MarkerOptions;
  
  layers = [
    circle([ 46.95, -122 ], { radius: 5000 }),
    polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    marker([ 46.879966, -121.726909 ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
     })
    }),
    geoJSON(null)
  ];

  constructor(private jsonSvc: JsonImportService) { }

  ngOnInit() {
    // console.log(this.layers);
    const data = this.jsonSvc.getData();
    console.log(data)
    this.layersControl.overlays['The World'] = geoJSON(data);
    // this.layers.push(geoJSON(data));
    // console.log(this.layers);
    // let layers = [...this.layers];
    // layers = data;


  }

}
