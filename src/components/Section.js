export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItemToEnd(element) {
    this._container.append(element);
  }

  addItemToBegin(element) {
    this._container.prepend(element);
  }
}