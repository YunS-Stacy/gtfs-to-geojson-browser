import Papa from 'papaparse';

export default (text: string) => {
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  return parsed;
};