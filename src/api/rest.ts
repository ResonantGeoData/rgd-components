import axios from 'axios';
import OauthClient from '@girder/oauth-client';
import { GeoJSON, Polygon, MultiPolygon } from 'geojson'; // eslint-disable-line
import { stringify } from 'qs';  // eslint-disable-line

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

export async function rgdSearch(
  limit?: number,
  offset?: number,
  q?: Polygon | MultiPolygon,
  predicate?: string | null,
  acquiredBefore?: string | null,
  acquiredAfter?: string | null,
  distanceMin? : string | null,
  distanceMax? : string | null,
  instrumentation?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  collections?: string[] | number[],

) {
  let geometry;
  if (q?.coordinates.length === 0) {
    // Catch if empty geometry is given (the default value for type sanity)
    geometry = undefined;
  } else {
    geometry = q;
  }
  const response = await axiosInstance.get('rgd/search', {
    params: {
      limit,
      offset,
      q: JSON.stringify(geometry),
      predicate,
      acquired_after: acquiredAfter,
      acquired_before: acquiredBefore,
      distance_min: distanceMin,
      distance_max: distanceMax,
      instrumentation,
      time_of_day_after: startTime,
      time_of_day_before: endTime,
      collections,
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
