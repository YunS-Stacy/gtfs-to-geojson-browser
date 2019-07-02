import parseGTFS from './parseGTFS';
import { loadCss, loadModules } from 'esri-loader';

export default async () => {
  // Set up input el
  const appEl = document.getElementById('app');
  const inputEl = document.createElement('input');
  inputEl.type = 'file';
  // inputEl.addEventListener('change', ev => {
  //   console.log(ev, 'ev');
  //   const files = inputEl.files;

  //   const file = files[0];
  //   console.log(files, file);

  //   const res = Papa.parse(file);
  //   console.log(res, 'res');
  //   // const fileReader = new FileReader();

  //   // fileReader.addEventListener(
  //   //   'load',
  //   //   e => {
  //   //     console.log(fileReader.result);
  //   //   },
  //   //   false,
  //   // );

  //   // fileReader.readAsText(file);
  // });

 
  // Set up view
  loadCss();
  const viewEl = document.createElement('div');
  viewEl.id = 'view'
  viewEl.setAttribute('style', 'width: 100vw; height: 100vh')
  appEl.appendChild(viewEl);

  const [SceneView]: __esri.SceneViewConstructor[] = await loadModules(['esri/views/SceneView']);
  const view = new SceneView({
    // An instance of Map or WebScene
    map: {
      basemap: "gray"
    },

    // The id of a DOM element (may also be an actual DOM element)
    container: "view"
  });

  view.when(() => {

    // Set up 'test' button
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = 'Run test';
    buttonEl.addEventListener('click', () => parseGTFS(view));
    appEl.appendChild(inputEl);
    appEl.appendChild(buttonEl);

  })



};
