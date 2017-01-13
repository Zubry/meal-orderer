import request from 'request-promise';

class User {
  constructor(root) {
    this.root = root;
  }

  me() {
    return request(`${this.root}/me/`)
      .then(JSON.parse);
  }
}

export default User;
