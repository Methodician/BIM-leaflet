// import { LatLng } from "leaflet";
import { FieldValue } from 'firebase/firestore'

export class DbPolygon {
    constructor(
        paths: dbPath[] | FieldValue,
        id?: string
    ){
        this.paths = paths;
        this.id = id || null;
    }

    id?: string;
    paths: dbPath[] | FieldValue;
}

export class dbPath {
    lat: number;
    lng: number;
}
