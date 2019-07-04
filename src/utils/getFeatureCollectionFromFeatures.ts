import { Feature, FeatureCollection } from "geojson";

export default (features: Feature[]): FeatureCollection => ({
  features,
  type: 'FeatureCollection',
});