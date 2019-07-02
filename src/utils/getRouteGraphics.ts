import { IGtfsRoute } from '..';

export default (datum: IGtfsRoute[]) => {
  console.time('shape')
  const grouped = groupByShapeId(datum);
  console.timeEnd('shape')
  return grouped;
};

export const groupByShapeId = (datum: IGtfsRoute[]) => {
  const res = datum.reduce(
    (prev, curr) => {
      if (prev.has(curr.shape_id)) {
        const oldLine = prev.get(curr.shape_id);
        const newLine = [...oldLine, curr]

        prev.set(curr.shape_id, newLine)
        return prev;
      }
      prev.set(curr.shape_id, [curr])

      return prev
    },
    new Map() as Map<string, IGtfsRoute[]>,
  );
  const routes = new Set();
  res.forEach((value, key) => {
    const newValue = value
      .sort(
        ({ shape_pt_sequence: a }, { shape_pt_sequence: b }) => a - b,
      )
      .reduce((prev, curr) => {
        return {
          type: 'polyline',
          spatialReference: { wkid: 4326 },
          ...prev,
          paths: [[...prev.paths[0], [curr.shape_pt_lon, curr.shape_pt_lat]]],
        }
      }, {paths: [[]]} as __esri.PolylineProperties);
    routes.add({
      geometry: newValue,
      symbol: {
      type: "simple-line",  // autocasts as SimpleLineSymbol()
      color: [226, 119, 40],
      width: 4
      },
      attributes: {
      RouteID: key,
    }});
  })
  return routes
};
