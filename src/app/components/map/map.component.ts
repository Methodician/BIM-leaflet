import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, MarkerOptions, icon, geoJSON, Map, polyline, point } from 'leaflet';
import { JsonImportService } from '@app/services/json-import.service';

@Component({
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  seedData = [geoJSON(null)];

  //  COPY AND PASTED FROM https://www.asymmetrik.com/ngx-leaflet-tutorial-angular-cli/
  // Define our base layers so we can reference them multiple times
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

  // Marker for the top of Mt. Ranier
  summit = marker([ 46.8523, -121.7603 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([ 46.78465227596462,-121.74141269177198 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  route = polyline([[ 46.78465227596462,-121.74141269177198 ],
    [ 46.80047278292477, -121.73470708541572 ],
    [ 46.815471360459924, -121.72521826811135 ],
    [ 46.8360239546746, -121.7323131300509 ],
    [ 46.844306448474526, -121.73327445052564 ],
    [ 46.84979408048093, -121.74325201660395 ],
    [ 46.853193528950214, -121.74823296256363 ],
    [ 46.85322881676257, -121.74843915738165 ],
    [ 46.85119913890958, -121.7519719619304 ],
    [ 46.85103829018772, -121.7542376741767 ],
    [ 46.85101557523012, -121.75431755371392 ],
    [ 46.85140013694763, -121.75727385096252 ],
    [ 46.8525277543813, -121.75995212048292 ],
    [ 46.85290292836726, -121.76049157977104 ],
    [ 46.8528160918504, -121.76042997278273 ]]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'Google Hybrid': this.googleHybrid
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.googleMaps, this.route, this.summit, this.paradise ],
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
      //  polyline: false,
       circle: {
           shapeOptions: {
               color: '#aaaaaa'
           }
       }
    }
 };


  ngOnInit(){

  }

  onMapReady(map: Map) {
    map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
  }

  onDrawReady(draw){
    console.log(draw);
  }


  //  REMAINS FROM ORIGINAL DOCUMENTATION:
  // mapOptions = {
  //   layers: [
  //     tileLayer(
  //       'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
  //       {
  //         maxZoom: 20,
  //         subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //         detectRetina: true
  //       }
  //       // { maxZoom: 18, attribution: '...'}
  //     )
  //   ],
  //   zoom: 13,
  //   // center: latLng(45.473865, -122.719355)
  //   center: latLng(46.879966, -121.726909)
  // };

  // layersControl = {
  //   baseLayers: {
  //       'Open Street Map DE': tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  //       'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  //       'Open Cycle Map': tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=7b61fd908c5243cdb236f35223f63feb', { maxZoom: 18, attribution: '...' })
  //   },
  //   overlays: {
  //       'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
  //       'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
  //   }
  // }

  // markerOptions: MarkerOptions;
  
  // layers = [
  //   circle([ 46.95, -122 ], { radius: 5000 }),
  //   polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
  //   marker([ 46.879966, -121.726909 ], {
  //     icon: icon({
  //       iconSize: [ 25, 41 ],
  //       iconAnchor: [ 13, 41 ],
  //       iconUrl: 'assets/marker-icon.png',
  //       shadowUrl: 'assets/marker-shadow.png'
  //          DIFFERENT CONFIGURATIO IN ANGULAR-CLI.JSON:
                                    // "assets": [
                                    //   "assets",
                                    //   "favicon.ico",
                                    //   {
                                    //     "glob": "**/*",
                                    //     "input": "../node_modules/leaflet/dist/images",
                                    //     "output": "leaflet/"
                                    //     // "output": "./assets/"
                                    //   }
                                    // ],
  //    })
  //   }),
  //   geoJSON(null)
  // ];

  // constructor(private jsonSvc: JsonImportService) { }

  // ngOnInit() {
  //   // console.log(this.layers);
  //   const data = this.jsonSvc.getData();
  //   // console.log(data)
  //   this.layersControl.overlays['The World'] = geoJSON(data);
  //   // for(let feature of data.features){
  //   //   this.layers.push(geoJSON(feature));
  //   // }
  //   // this.layers.push(geoJSON(data));
  //   // console.log(this.layers);
  //   // let layers = [...this.layers];
  //   // layers = data;


  // }

  // onMapReady(map: Map){
  //   console.log(map);
  //   map.addEventListener('click', (e) => {
  //     console.log(e);
  //   });
  // }

  // layerClicked(event, layer){
  //   console.log('layer clicked');
  //   console.log('event', event);
  //   console.log('layer', layer);
  // }

}
