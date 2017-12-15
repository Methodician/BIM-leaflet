import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, MarkerOptions, icon, geoJSON, Map, polyline, point } from 'leaflet';
import { JsonImportService } from '@app/services/json-import.service';

import * as L from 'leaflet';
import { FeatureGroup } from 'leaflet';
import { LayerGroup } from 'leaflet';
import { Polyline } from 'leaflet';
import { Layer } from 'leaflet';

import { googleMaps, googleHybrid, summit, paradise, route } from './mapTestData';
import { MapService } from '@app/services/map.service';
import { DbPolygon } from '@app/models/dbPolygon.model';
import { Polygon } from 'leaflet';
import { LatLng } from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  // seedData = [geoJSON(null)];

  editablLayers = new FeatureGroup();

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': googleMaps,
      'Google Hybrid': googleHybrid
    },
    overlays: {
      'Mt. Rainier Summit': summit,
      'Mt. Rainier Paradise Start': paradise,
      'Mt. Rainier Climb Route': route
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ googleMaps, this.editablLayers ],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };

  
  // editableLayers = new FeatureGroup(new LayerGroup(this.route))

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
       circle: {
           shapeOptions: {
               color: '#aaaaaa'
           }
       }
    },
    edit: {
      featureGroup: this.editablLayers,
      remove: false
    }
 };

  // testGeoJson = {"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-168.16047115799995,-14.520928643999966],[-168.1615697909999,-14.532891533999901],[-168.17308508999992,-14.52369557099992],[-168.16352291599992,-14.519789320999934],[-168.16047115799995,-14.520928643999966]]],[[[-170.62006588399993,-14.25457122199991],[-170.59101314999995,-14.264825127999927],[-170.5762426419999,-14.252536716999884],[-170.56725012899986,-14.258558851999894],[-170.5684708319999,-14.270928643999838],[-170.58417721299995,-14.277764580999943],[-170.6423233709999,-14.280694268999952],[-170.65929114499986,-14.285251559999992],[-170.68358313699994,-14.30282968500002],[-170.72179114499988,-14.35344817499984],[-170.74864661399988,-14.374688408999916],[-170.7554825509999,-14.367120049999869],[-170.79645748599992,-14.339939059999864],[-170.82282467399992,-14.326755466999998],[-170.83124752499995,-14.319431247999901],[-170.78864498599992,-14.29452890399996],[-170.77257239499994,-14.291436455999886],[-170.7378637359999,-14.29208749799993],[-170.72150631399995,-14.289239190999893],[-170.6984757149999,-14.260511976999936],[-170.66144771999996,-14.252373956],[-170.62006588399993,-14.25457122199991]]],[[[-169.4401342439999,-14.245293877999956],[-169.44713294199988,-14.255629164999874],[-169.46015377499987,-14.250420830999957],[-169.46808834499993,-14.258721612999949],[-169.47618567599986,-14.262383721999996],[-169.48497473899994,-14.261976820999891],[-169.49486243399994,-14.257256768999895],[-169.49836178299992,-14.266045830999943],[-169.50426184799986,-14.270603122999901],[-169.51252193899995,-14.271742445999848],[-169.52281653599988,-14.270928643999838],[-169.52550208199995,-14.258965752999899],[-169.52928626199986,-14.248793226999936],[-169.5347794259999,-14.24114348799992],[-169.54267330599987,-14.236748955999843],[-169.52753658799986,-14.226006768999923],[-169.50645911399985,-14.22226327899989],[-169.4638565749999,-14.22323984199987],[-169.4440404939999,-14.230645440999936],[-169.4401342439999,-14.245293877999956]]],[[[-169.63560950399986,-14.177015882999868],[-169.66014563699989,-14.189141533999859],[-169.66974850199986,-14.187920830999843],[-169.67621822799995,-14.174899997999859],[-169.67617753799988,-14.174899997999859],[-169.66816158799992,-14.16912200299997],[-169.65819251199994,-14.16887786299985],[-169.6471654939999,-14.172133070999891],[-169.63560950399986,-14.177015882999868]]],[[[-171.07347571499992,-11.062107028999918],[-171.08153235599994,-11.066094658999901],[-171.08653723899988,-11.060316664999931],[-171.0856420559999,-11.051364841999913],[-171.07282467399995,-11.052504164999945],[-171.07347571499992,-11.062107028999918]]]]},"properties":{"scalerank":5,"featurecla":"Admin-0 country","LABELRANK":4,"SOVEREIGNT":"United States of America","SOV_A3":"US1","ADM0_DIF":1,"LEVEL":2,"TYPE":"Dependency","ADMIN":"American Samoa","ADM0_A3":"ASM","GEOU_DIF":0,"GEOUNIT":"American Samoa","GU_A3":"ASM","SU_DIF":0,"SUBUNIT":"American Samoa","SU_A3":"ASM","BRK_DIFF":0,"NAME":"American Samoa","NAME_LONG":"American Samoa","BRK_A3":"ASM","BRK_NAME":"American Samoa","BRK_GROUP":"","ABBREV":"Am. Samoa","POSTAL":"AS","FORMAL_EN":"American Samoa","FORMAL_FR":"","NAME_CIAWF":"American Samoa","NOTE_ADM0":"U.S.A.","NOTE_BRK":"","NAME_SORT":"American Samoa","NAME_ALT":"","MAPCOLOR7":4,"MAPCOLOR8":5,"MAPCOLOR9":1,"MAPCOLOR13":1,"POP_EST":51504,"POP_RANK":8,"GDP_MD_EST":711,"POP_YEAR":2017,"LASTCENSUS":2010,"GDP_YEAR":2013,"ECONOMY":"6. Developing region","INCOME_GRP":"3. Upper middle income","WIKIPEDIA":-99,"FIPS_10_":"AQ","ISO_A2":"AS","ISO_A3":"ASM","ISO_A3_EH":"ASM","ISO_N3":"016","UN_A3":"016","WB_A2":"AS","WB_A3":"ASM","WOE_ID":23424746,"WOE_ID_EH":23424746,"WOE_NOTE":"Exact WOE match as country","ADM0_A3_IS":"ASM","ADM0_A3_US":"ASM","ADM0_A3_UN":-99,"ADM0_A3_WB":-99,"CONTINENT":"Oceania","REGION_UN":"Oceania","SUBREGION":"Polynesia","REGION_WB":"East Asia & Pacific","NAME_LEN":14,"LONG_LEN":14,"ABBREV_LEN":9,"TINY":3,"HOMEPART":-99,"MIN_ZOOM":0,"MIN_LABEL":4,"MAX_LABEL":9}}
  testGeoJson = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [45.29324494090277, -122.2716522216797],
        [45.24395342262325, -122.2311401367188],
        [45.32704768567261, -122.1456527709961]
      ]]
    },
    "properties": {
      "prop1": "hello"
    }
  };

  constructor(private mapSvc: MapService){

  }

  ngOnInit(){
    this.mapSvc.getPolygons().valueChanges().subscribe((polygons: any[]) => {
      this.editablLayers.clearLayers();
      this.editablLayers
      .addLayer(route)
      .addLayer(summit)
      .addLayer(paradise);
      for(let poly of polygons){
        let layer = polygon(poly.paths, { id: poly.id } as any);
        this.editablLayers.addLayer(layer);
      }
    });
  }

  pathsFromLatLngs(polyLatLngs: LatLng[]){
    return polyLatLngs.map((latLngs: any) => {
      return latLngs.map(latLng => {
        return { lat: latLng.lat, lng: latLng.lng};
      });
    });
  }

  onMapReady(map: Map) {
    map.fitBounds(route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });

    map.on(L.Draw.Event.CREATED, (e: any) => {

      this.editablLayers.addLayer(e.layer);
      const type = this.getLayerType(e.layer);
      if(type == 'polygon'){
        const polyLayer = <Polygon>e.layer;
        let paths = this.pathsFromLatLngs(polyLayer.getLatLngs());
        let dbPoly: DbPolygon = { paths };
        this.mapSvc.addPolygon(dbPoly);
      }
    });

    map.on(L.Draw.Event.EDITED, (e: any) => {
      const layers = e.layers._layers;
      console.log(layers);
      for(let i in layers){
        let layer = layers[i];
        const type = this.getLayerType(layer);
        const id = layer.options.id;
        if(type == 'polygon'){
          const polyLayer = <Polygon>layer;
          let paths = this.pathsFromLatLngs(polyLayer.getLatLngs());
          console.log(type, id, paths);
          let dbPoly: DbPolygon = {
            paths: paths,
            id: id
          };
          if(id)
            this.mapSvc.updatePolygonPaths(dbPoly);
        }
      }
      // console.log(this.editablLayers);
    });

    this.editablLayers.on('click', (e: any) => {
      // console.log(e);
      const type = this.getLayerType(e.layer);
      const id = e.layer.options.id;
      console.log(e);
      console.log(type);
      console.log(id);
      console.log(e.layer._latlngs);
      // e.layer.editing._enabled = true;
      // console.log(e);
    })
    // for(let l of this.editablLayers.getLayers()){
    //   l.on('click', (e: any) => {
    //     console.log(e);
    //     console.log(l);
    //   });
    // }

    map.addEventListener('click', (e) => {
      // console.log(e);
    })
  }

  getLayerType(layer: Layer) {
    
        if (layer instanceof L.Circle) {
            return 'circle';
        }
    
        if (layer instanceof L.Marker) {
            return 'marker';
        }
    
        if ((layer instanceof L.Polyline) && ! (layer instanceof L.Polygon)) {
            return 'polyline';
        }
    
        if ((layer instanceof L.Polygon) && ! (layer instanceof L.Rectangle)) {
            return 'polygon';
        }
    
        if (layer instanceof L.Rectangle) {
            return 'rectangle';
        }
    
    };



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
