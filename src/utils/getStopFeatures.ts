import { Feature, Point } from 'geojson';
import { IGtfsStop } from '..';

export default (datum: IGtfsStop[]) => {
  const stops: Feature<Point, IGtfsStop>[] = datum.reduce(
    (prev, { stop_lat, stop_lon, ...rest }) => [
      ...prev,
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [stop_lon, stop_lat],
        },
        properties: rest,
      },
    ],
    [],
  );

  return stops;
};
