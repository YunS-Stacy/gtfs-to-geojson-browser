import { IGtfsStop } from '..';

export default (datum: IGtfsStop[]) => {
  const res = new Set();
  datum.forEach(({ stop_lat, stop_lon, ...rest }) => {
    res.add({
    geometry: {
      x: stop_lon,
      y: stop_lat,
      longitude: stop_lon,
      latitude: stop_lat,
      hasZ: false,
      type: 'point',
      spatialReference: { wkid: 4326 },
    } as __esri.PointProperties,
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
      style: "square",
      color: "blue",
      size: "8px",  // pixels
      outline: {  // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0],
        width: 3  // points
      }
    },
    attributes: rest,
  }) as __esri.GraphicProperties});

  return res;
};
