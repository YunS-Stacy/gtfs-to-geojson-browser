import parseGTFS from './parseGTFS';

export default async () => {
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
    // const fileReader = new FileReader();

    // fileReader.addEventListener(
    //   'load',
    //   e => {
    //     console.log(fileReader.result);
    //   },
    //   false,
    // );

    // fileReader.readAsText(file);
  });

  // Set up 'test' button
  const buttonEl = document.createElement('button');
  buttonEl.innerHTML = 'Run test';
  buttonEl.addEventListener('click', () => parseGTFS());
  appEl.appendChild(inputEl);
  appEl.appendChild(buttonEl);
};
