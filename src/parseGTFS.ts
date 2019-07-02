import { IGtfsRoute } from '.';
import { loadGraphicsLayerModule } from './utils/loadCommonModules';


export default async (view: __esri.SceneView) => {
  // // Load sample data
  const res = await fetch('gtfs/gtfs_honolulu.zip');
  const blob = await res.blob();

  // Use worker, not to block UI
  const worker = new Worker('./workers/RouteWorker.js');

  worker.postMessage(blob);
  worker.onmessage = async e => {
    const GraphicsLayer = await loadGraphicsLayerModule();
    const graphics = Array.from(e.data[0]).concat(Array.from(e.data[1]))
    const layer = new GraphicsLayer({
      graphics
    })
    view.map.add(layer);
    await view.whenLayerView(layer);
    view.goTo(layer.graphics)
  }
};

const getPolylines = (datum: { [key: string]: IGtfsRoute[] }) => {
  const polylines = Object.values(datum).map((arr) => {
    const paths = [arr.map(el => [el.shape_pt_lon, el.shape_pt_lat])];
    const line = {
      paths,
      type: 'polyline',
      spatialReference: { wkid: 4326 },
    };

    return line;
  });

  return polylines;
};
