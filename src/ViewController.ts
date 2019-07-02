export default class ViewController {
  _view: __esri.View;
  constructor(view: __esri.View) {
    this._view = view;
  }

  
  public get view() : __esri.View {
    return this._view;
  }
  
}