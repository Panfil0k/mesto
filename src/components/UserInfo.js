export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    this._profileData = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent
    };    
    return this._profileData
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}