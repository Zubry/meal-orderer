import User from './user.js';
import Order from './order.js';

class MonterailAPI {
  constructor(root) {
    this.root = root;
    this.user = new User(root);
    this.order = new Order(root);
  }
}

export default MonterailAPI;
