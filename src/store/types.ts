export type Degrees = {
  longitude: number,
  latitude: number,
  height: number,
};
import { GeoJSON } from 'geojson';  // eslint-disable-line

export type RGDResult = {
  spatial_id: number;
  acquisition_date: string | null;
  footprint: {
    type: string;
    coordinates: Array<Array<number>>;
  };
  instrumentation: string | null;
  outline: {
    type: string;
    coordinates: Array<Array<number>>;
  };
  subentry_type: string;
  subentry_name: string;
  show_footprint: boolean;
  show_overlay: boolean;
};


export type RegionResult = {
  created: string;
  end_date: string;
  footprint: GeoJSON;
  id: number;
  modified: string;
  outline: GeoJSON;
  properties: {
    comments: string[];
    end_date: string;
    mgrs: string;
    model_content: string;
    originator: string;
    region_id: string;
    start_date: string;
    type: string;
    version: string;
  };
  region_id: string;
  start_date: string;
};


export type RGDResultList = Array<RGDResult>;

export interface SearchParameters {
  predicate: string | null;
  acquired: {
    startDate: string | null;
    endDate: string | null;
    startDateModal?: boolean;
    endDateModal?: boolean;
  };
}

export interface Collection {
  id: number | null;
  name: string | null;
}
export interface ResultsFilter {
  distance: {
    min: string | null;
    max: string | null;
  };
  instrumentation: string | null;
  collections: Collection[];
  time: {
    startTime: string | null;
    endTime: string | null;
    startTimeModal?: boolean;
    endTimeModal?: boolean;
  };
}
