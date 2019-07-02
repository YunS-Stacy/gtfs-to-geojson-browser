import { IGtfsRoute } from '..';
import { LineString, Feature } from 'geojson';

export default (datum: IGtfsRoute[]) => {
  console.time('shape');
  const grouped = groupByShapeId(datum);
  console.timeEnd('shape');
  return grouped;
};

export const groupByShapeId = (datum: IGtfsRoute[]) => {
  const res = datum.reduce(
    (prev, curr) => {
      if (prev.has(curr.shape_id)) {
        const oldLine = prev.get(curr.shape_id);
        const newLine = [...oldLine, curr];

        prev.set(curr.shape_id, newLine);
        return prev;
      }
      prev.set(curr.shape_id, [curr]);

      return prev;
    },
    new Map() as Map<string, IGtfsRoute[]>,
  );
  const routes: Set<Feature> = new Set();
  res.forEach((value, key) => {
    const newValue = value
      .sort(({ shape_pt_sequence: a }, { shape_pt_sequence: b }) => a - b)
      .reduce(
        (prev, curr) => {
          return {
            ...prev,
            coordinates: [
              ...prev.coordinates,
              [curr.shape_pt_lon, curr.shape_pt_lat],
            ],
          };
        },
        {
          type: 'LineString',
          coordinates: [],
        } as LineString,
      );
    routes.add({
      type: 'Feature',
      geometry: newValue,
      properties: {
        RouteID: key,
      },
    });
  });
  return routes;
};
