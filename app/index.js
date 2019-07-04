'use strict';
import parseGTFS from '../lib/index';

(async () => {
  // Set up input el
  const appEl = document.getElementById('app');
  
  const inputEl = document.createElement('input');
  inputEl.type = 'file';
  inputEl.accept =
    '.zip,zip,application/zip,application/x-zip,application/x-zip-compressed';
  inputEl.addEventListener('change', (ev) => {
    const files = inputEl.files;
    const file = files[0];
    parseGTFS(file);
  });

  appEl.appendChild(inputEl);
})();
