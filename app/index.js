'use strict';
import Parser from '../lib/index';

(async () => {
  // Set up input el
  const appEl = document.getElementById('app');

  const inputEl = document.createElement('input');
  appEl.appendChild(inputEl);

  const resEl = document.createElement('div');
  resEl.style.whiteSpace = 'pre-wrap';
  appEl.appendChild(resEl);

  inputEl.type = 'file';
  inputEl.accept =
    '.zip,zip,application/zip,application/x-zip,application/x-zip-compressed';
  inputEl.addEventListener('change', ev => {
    resEl.innerHTML = 'Parsing...'
    const files = inputEl.files;
    const file = files[0];

    const parser = new Parser();
    parser.createWorker({ blob: file }).then(res => {
      Object.keys(res).forEach((k, i) => {
        const str = `${k}: ${res[k].length} in total \n`;
        if (i === 0) {
          resEl.innerHTML = str;
        } else {
          resEl.innerHTML += str;
        }
      });
    });
  });
})();
