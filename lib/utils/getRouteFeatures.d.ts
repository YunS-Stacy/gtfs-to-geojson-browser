import { Feature } from 'geojson';
import { IGtfsRoute } from '../parseGTFS';
declare const _default: (datum: IGtfsRoute[]) => Set<Feature<import("geojson").Geometry, {
    [name: string]: any;
}>>;
export default _default;
export declare const groupByShapeId: (datum: IGtfsRoute[]) => Set<Feature<import("geojson").Geometry, {
    [name: string]: any;
}>>;
