import { GeoJSON } from 'geojson';

export type Location = {
  longitude: number,
  latitude: number,
  height: number,
};

export type Footprint = {
  geoFootPrint: GeoJSON,
  spatialID: number,
};
