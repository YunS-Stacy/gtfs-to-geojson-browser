import { Feature } from 'geojson';
import { IGtfsStop } from '../parseGTFS';
declare const _default: (datum: IGtfsStop[]) => Set<Feature<import("geojson").Geometry, {
    [name: string]: any;
}>>;
export default _default;
