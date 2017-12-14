import { Component, OnInit } from '@angular/core';
import { icon } from 'leaflet';
import { tileLayer } from 'leaflet';
import { latLng } from 'leaflet';

@Component({
  selector: 'map-draw',
  templateUrl: './map-draw.component.html',
  styleUrls: ['./map-draw.component.css']
})
export class MapDrawComponent implements OnInit {

  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: false //  true was making text on map too small
  });
  googleHybrid = tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: false //  true was making text on map too small
  });
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'Google Hybrid': this.googleHybrid
    }
  };
  options = {
    layers: [ this.googleMaps ],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };
  
  drawOptions = {
    position: 'topright',
    draw: {
       marker: {
          icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'leaflet/marker-icon.png',
              shadowUrl: 'leaflet/marker-shadow.png'
          })
       },
       polyline: false,
       circle: {
           shapeOptions: {
               color: '#aaaaaa'
           }
       }
    }
 };

  constructor() { }

  ngOnInit() {
  }

}
