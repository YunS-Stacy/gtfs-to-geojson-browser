import Zip from 'jszip';
import getRouteGraphics from '../utils/getRouteGraphics';
import parseTxt from '../utils/parseTxt';
import getIGtfsStopPoints from '../utils/getIGtfsStopGraphics';

self.onmessage = async e => {
  console.time('total')

  const { data: blob } = e
  // Load sample data
  const { files } = await Zip.loadAsync(blob)
    // Unzip
  const datum = await Promise.all(
    Object.keys(files)
      .filter(el => /shape|stops/i.test(el))
      .map(async key => {
        if (/shape/i.test(key)) {
          const text = await files[key].async('text');
          const { data } = parseTxt(text);
          // Generate shape
          const res = getRouteGraphics(data);
          return Promise.resolve(res);
        }
        if (/stops/i.test(key)) {
          const text = await files[key].async('text');
          const { data } = parseTxt(text);

          // Generate shape
          const res = getIGtfsStopPoints(data);
          console.log(res.size);
          
          return Promise.resolve(res);
        }
      })
  );

  console.timeEnd('total')
  self.postMessage(datum)
};
