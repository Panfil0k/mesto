export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._profileData = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };    
    return this._profileData
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}