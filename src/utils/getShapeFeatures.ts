import { LineString, Feature, Geometry } from 'geojson';
import { IGtfsShape, IGtfsTripExtended } from '..';

export default (datum: IGtfsShape[]) => {
  const grouped = groupByShapeId(datum);
  return grouped;
};

export const groupByShapeId = (datum: IGtfsShape[]) => {
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
    new Map() as Map<IGtfsShape['shape_id'], IGtfsShape[]>,
  );
  const shapes: Feature<LineString, Partial<IGtfsTripExtended>>[] = [];
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
    shapes.push({
      type: 'Feature',
      geometry: newValue,
      properties: {
        shape_id: key,
      },
    });
  });
  return shapes;
};
