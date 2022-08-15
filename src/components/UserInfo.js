export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileJobSelector = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._profileData = {
      profileName: this._profileNameSelector.textContent,
      profileJob: this._profileJobSelector.textContent
    };    
    return this._profileData
  }

  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profileJobSelector.textContent = data.job;
  }
}