import Papa from 'papaparse';

export default (text: string) => {
  console.time('parse txt')
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  console.timeEnd('parse txt')
  return parsed;
};