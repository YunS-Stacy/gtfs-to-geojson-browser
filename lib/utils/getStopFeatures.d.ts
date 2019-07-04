import { Feature, Point } from 'geojson';
import { IGtfsStop } from '..';
declare const _default: (datum: IGtfsStop[]) => Feature<Point, IGtfsStop>[];
export default _default;
