import { Feature } from 'geojson';
export interface IGtfsRoute {
    route_id: string;
    shape_id: string;
    shape_pt_lat: number;
    shape_pt_lon: number;
    shape_pt_sequence: number;
}
export interface IGtfsStop {
    stop_id: string;
    stop_code: string;
    stop_name: string;
    stop_desc: string;
    stop_lat: number;
    stop_lon: number;
    stop_url?: string;
    location_type?: 0 | 1 | 2 | 3 | 4 | undefined;
    parent_station?: IGtfsStop['stop_id'];
}
export interface IGtfsTrip {
    route_id: IGtfsRoute['route_id'];
    service_id: string;
    trip_id: string;
    trip_headsign?: string;
    trip_short_name?: string;
    direction_id?: 0 | 1;
    block_id?: string;
    shape_id?: string;
    wheelchair_accessible: 0 | 1 | 2 | undefined;
    bikes_allowed: 0 | 1 | 2 | undefined;
}
declare const _default: (file: File | Blob) => Promise<{
    routes: Feature<import("geojson").Geometry, {
        [name: string]: any;
    }>[];
    shapes: Feature<import("geojson").Geometry, {
        [name: string]: any;
    }>[];
}>;
export default _default;
