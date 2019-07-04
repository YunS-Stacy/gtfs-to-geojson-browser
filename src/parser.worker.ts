import Zip from 'jszip';
import getShapeFeatures from './utils/getShapeFeatures';
import parseTxt from './utils/parseTxt';
import getStopFeatures from './utils/getStopFeatures';
import { IGtfsZipFile, IGtfsTrip, IGtfsRoute, IGtfsTripExtended } from '.';

const ctx: Worker = self as any;
ctx.onmessage = async (e: {
  data: {
    blob: Blob;
    fileOptions: (keyof IGtfsZipFile)[];
  };
}) => {
  if (!e.data) return;
  console.log(e.data, 'e.data');

  const {
    data: { blob, fileOptions },
  } = e;
  // Load sample data
  const { files } = await Zip.loadAsync(blob);
  // Unzip
  const datum = await Promise.all(
    Object.keys(files).map(async name => {
      const key = name.replace('.txt', '') as keyof IGtfsZipFile;

      if (!fileOptions.includes(key)) return null;

      const text = await files[name].async('text');
      const { data } = parseTxt(text);

      if (/shapes$/i.test(key)) {
        // Generate shape
        const res = getShapeFeatures(data);
        return { [key]: res };
      }

      if (/stops$/i.test(key)) {
        // Generate shape
        const res = getStopFeatures(data);

        return { [key]: res };
      }

      return {
        [key]: data
      };
    }),
  );

  const res: {
      shapes?: ReturnType<typeof getShapeFeatures>;
      stops?: ReturnType<typeof getStopFeatures>;
      routes?: IGtfsRoute[];
      trips?: IGtfsTripExtended[];
    } = datum.reduce(
    (prev, curr) => ({
      ...prev,
      ...curr,
    }),
    {} as {
      shapes?: ReturnType<typeof getShapeFeatures>;
      stops?: ReturnType<typeof getStopFeatures>;
      routes?: IGtfsRoute[];
      trips?: IGtfsTripExtended[];
    },
  );

  console.log(res, 'res');

  // Extend shapes features
  if (res.hasOwnProperty('shapes')) {
    if (res.hasOwnProperty('trips') && res.trips.length > 0) {
      const {
        shapes,
        trips,
      }: {
        shapes: ReturnType<typeof getShapeFeatures>;
        trips: IGtfsTrip[];
      } = res as any;
      const newShapes = shapes.map(shape => {
        const { properties } = shape;

        const tripItemId = trips.findIndex(
          ({ shape_id }) => shape_id === properties.shape_id,
        );
        if (tripItemId === -1) {
          return shape;
        }

        const tripItem = trips[tripItemId];
        const newProperties = {
          ...properties,
          ...tripItem,
        };
        return {
          ...shape,
          properties: newProperties,
        } as typeof shape;
      });
      res.shapes = newShapes;
    }
  }

  ctx.postMessage([res]);
};

// Trickery to fix TypeScript since this will be done by "worker-loader"
export default {} as typeof Worker & (new () => Worker);
