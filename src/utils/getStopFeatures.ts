import { IGtfsStop } from '..';
import { Feature } from 'geojson';

export default (datum: IGtfsStop[]) => {
  const res: Set<Feature> = new Set();
  datum.forEach(({ stop_lat, stop_lon, ...rest }) => {
    res.add({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [stop_lon, stop_lat],
      },
      properties: rest,
    } as Feature)
  });

  return res;
};
