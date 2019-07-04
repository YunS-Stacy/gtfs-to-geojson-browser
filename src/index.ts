import Parser from './parser.worker';
import getShapeFeatures from './utils/getShapeFeatures';
import getStopFeatures from './utils/getStopFeatures';

export interface IGtfsStop {
  stop_id: string;
  stop_code?: string;
  stop_name?: string;
  stop_desc?: string;
  stop_lat: number;
  stop_lon: number;
  zone_id?: string;
  stop_url?: string;
  location_type?: 0 | 1 | 2 | 3 | 4 | undefined | null;
  parent_station?: IGtfsStop['stop_id'];
  stop_timezone?: string;
  wheelchair_boarding?: 0 | 1 | 2 | undefined | null;
  level_id?: string;
  platform_code?: string;
}

export interface IGtfsRoute {
  route_id: string;
  agency_id?: string;
  route_short_name?: string;
  route_long_time?: string;
  route_desc?: string;
  route_type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined | null;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
  route_sort_order?: number;
}

export interface IGtfsTrip {
  route_id: IGtfsRoute['route_id'];
  service_id: string;
  trip_id: string;
  trip_headsign?: string;
  trip_short_name?: string;
  direction_id?: 0 | 1;
  block_id?: string;
  shape_id?: IGtfsShape['shape_id'];
  wheelchair_accessible?: 0 | 1 | 2 | undefined | null;
  bikes_allowed?: 0 | 1 | 2 | undefined | null;
}

export interface IGtfsShape {
  shape_id: string;
  shape_pt_lat: number;
  shape_pt_lon: number;
  shape_pt_sequence: number;
  shape_dist_traveled?: number;
}

export interface IGtfsTripExtended extends IGtfsTrip {
  shape_id: IGtfsShape['shape_id'];
}

export interface IGtfsZipFile {
  stops: IGtfsStop[];
  routes: IGtfsRoute[];
  trips: IGtfsTrip[];
  shapes: IGtfsShape[];
}

interface IGtfsResponse {
  shapes?: ReturnType<typeof getShapeFeatures>;
  stops?: ReturnType<typeof getStopFeatures>;
  routes?: IGtfsRoute[];
  trips?: IGtfsTripExtended[];
}
const parseGTFS = async (
  file: File | Blob,
  fileOptions: (keyof IGtfsZipFile)[] = ['stops', 'routes', 'trips', 'shapes'],
): Promise<IGtfsResponse> => {
  console.time('parse');
  if (!file) {
    console.timeEnd('parse');
    return null;
  }
  // Use worker, not to block UI
  const worker: Worker = new (Parser as any)();

  worker.postMessage({
    fileOptions,
    blob: file,
  });
  worker.onmessage = async (e: { data: IGtfsResponse[] }) => {
    // parsepapa will also publish message event
    if (Array.isArray(e.data) && e.data.length > 0) {
      const [parsed] = e.data;
      console.timeEnd('parse');
      return parsed;
    }
  };
};

export type PARSE_GTFS = typeof parseGTFS;
export default parseGTFS;
