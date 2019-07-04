import { LineString, Feature } from 'geojson';
import { IGtfsShape, IGtfsTripExtended } from '..';
declare const _default: (datum: IGtfsShape[]) => Feature<LineString, Partial<IGtfsTripExtended>>[];
export default _default;
export declare const groupByShapeId: (datum: IGtfsShape[]) => Feature<LineString, Partial<IGtfsTripExtended>>[];
