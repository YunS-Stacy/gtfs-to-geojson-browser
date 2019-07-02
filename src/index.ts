import init from './init';

init();

export interface IGtfsRoute {
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
  location_type?: string;
  parent_station?: string;
  tpis_name?: string;
}
