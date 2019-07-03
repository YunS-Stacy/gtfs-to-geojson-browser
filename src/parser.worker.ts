import Zip from 'jszip';
import getRouteFeatures from './utils/getRouteFeatures';
import parseTxt from './utils/parseTxt';
import getStopFeatures from './utils/getStopFeatures';

const ctx: Worker = self as any;
ctx.onmessage = async (e) => {
  const { data: blob } = e;
  // Load sample data
  const { files } = await Zip.loadAsync(blob);
  // Unzip
  const datum = await Promise.all(
    Object.keys(files)
      .filter((el) => /shape|stops/i.test(el))
      .map(async (key) => {
        if (/shape/i.test(key)) {
          console.time('parse shape');

          const text = await files[key].async('text');
          const { data } = parseTxt(text);
          // Generate shape
          const res = getRouteFeatures(data);
          console.timeEnd('parse shape');

          return Promise.resolve(res);
        }
        if (/stops/i.test(key)) {
          console.time('parse stop');

          const text = await files[key].async('text');
          const { data } = parseTxt(text);

          // Generate shape
          const res = getStopFeatures(data);
          console.timeEnd('parse stop');

          return Promise.resolve(res);
        }
      }),
  );
  ctx.postMessage(datum);
};

// Trickery to fix TypeScript since this will be done by "worker-loader"
export default {} as typeof Worker & (new () => Worker);