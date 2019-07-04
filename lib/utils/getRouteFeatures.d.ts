import { Feature } from 'geojson';
import { IGtfsShape } from '..';
declare const _default: (datum: IGtfsShape[]) => {
    routes: Set<Feature<import("geojson").Geometry, {
        [name: string]: any;
    }>>;
};
export default _default;
export declare const groupByShapeId: (datum: IGtfsShape[]) => {
    routes: Set<Feature<import("geojson").Geometry, {
        [name: string]: any;
    }>>;
};
