import axios from 'axios';
import OauthClient from '@girder/oauth-client';
import { GeoJSON } from 'geojson'; // eslint-disable-line
import { stringify } from 'qs';  // eslint-disable-line
import { RGDSearch } from '@/store/types';



export const axiosInstance = axios.create({
  baseURL: import.meta.env.VUE_APP_OAUTH_API_ROOT as string,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
});
export const oauthClient = new OauthClient(
  new URL(import.meta.env.VUE_APP_OAUTH_API_ROOT as string),
  import.meta.env.VUE_APP_OAUTH_CLIENT_ID as string,
);

export async function restoreLogin() {
  if (!oauthClient) {
    return;
  }
  await oauthClient.maybeRestoreLogin();
}

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...oauthClient?.authHeaders,
    ...config.headers,
  },
}));



export async function rgdSearch(search:RGDSearch) {
  let geometry;
  if (search.specifiedShape?.coordinates.length === 0) {
    // Catch if empty geometry is given (the default value for type sanity)
    geometry = undefined;
  } else {
    geometry = search.specifiedShape;
  }
  const response = await axiosInstance.get('rgd/search', {
    params: {
      limit: search.searchLimit,
      offset: search.searchOffset,
      q: JSON.stringify(geometry),
      predicate: search.predicate,
      acquired_after: search.acquired.startDate,
      acquired_before: search.acquired.endDate,
      distance_min: search.distance.min,
      distance_max: search.distance.max,
      instrumentation: search.instrumentation,
      time_of_day_after: search.time.startTime,
      time_of_day_before: search.time.endTime,
      collections: search.collectionIDs,
    },
  });
  return response;
}


export async function rgdFootprint(
  spatialID: number,
) {
  const response = await axiosInstance.get<{ footprint: GeoJSON }>(`rgd/spatial_entry/${spatialID}/footprint`);
  return response.data.footprint;
}

export async function rgdRegionSites(
  regionId: number,
): Promise<GeoJSON> {
  const response = await axiosInstance.get<GeoJSON>(`watch/region/${regionId}/sites`);
  return response.data;
}


export async function rgdCollections() {
  const response = await axiosInstance.get('/rgd/collection');
  return response.data.results;
}
