import { Feature } from 'geojson';
import Parser from './parser.worker';

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

export default async (file: File | Blob): Promise<{
  routes: Feature[];
  shapes: Feature[];
}> => {
  console.time('parse')
  if (!file) {
    console.timeEnd('parse')
    return null;
  }
  // Use worker, not to block UI
  const worker: Worker = new (Parser as any)();

  worker.postMessage(file);
  worker.onmessage = async e => {
    const graphics = Array.from(e.data[0]).concat(Array.from(e.data[1]))
    console.log(graphics.length, 'graphics');
    console.timeEnd('parse')
    return {
      routes: Array.from(e.data[0]),
      shapes: Array.from(e.data[1]),
    };
  }
};
