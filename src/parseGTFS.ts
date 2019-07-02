export default async (file?: File) => {
  console.time('parse')
  let blob: Blob;
  if (file) {
    blob = file;
  } else {
    // Load sample data
    const res = await fetch('gtfs/gtfs_honolulu.zip');
    blob = await res.blob();
  }
  // Use worker, not to block UI
  const worker = new Worker('./workers/parse.worker.ts');

  worker.postMessage(blob);
  worker.onmessage = async e => {
    const graphics = Array.from(e.data[0]).concat(Array.from(e.data[1]))
    console.log(graphics.length, 'graphics');
    console.timeEnd('parse')
    return {
      routes: Array.from(e.data[0]),
      shapes: Array.from(e.data[1]),
    };
  }
};
