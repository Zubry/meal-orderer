import request from 'request-promise';

function print(e) {
  console.log(e);
  return e;
}

class Order {
  constructor(root) {
    this.root = root;
  }

  post(uri, body) {
    const o = {
      method: 'POST',
      uri: uri,
      body: body,
      json: true
    };

    return request(o);
  }

  patch(uri, body) {
    const o = {
      method: 'PATCH',
      uri: uri,
      body: body,
      json: true
    };

    return request(o);
  }

  all() {
    return request(`${this.root}/orders/`)
      .then(JSON.parse)
      .then(print);
  }

  archived() {
    return request(`${this.root}/orders/history/`)
      .then(JSON.parse)
      .then(o => o || [])
      .then(print);
  }

  active() {
    return request(`${this.root}/orders/active/`)
      .then(JSON.parse)
      .then(print);
  }

  meals(order) {
    return request(`${this.root}/orders/${order}/meals/`)
      .then(JSON.parse);
  }

  order_meal(order, name, price) {
    return this.post(`${this.root}/meals/`, { order, name, price });
  }

  place(restaurant) {
    return this.post(`${this.root}/orders/`, { restaurant });
  }

  set_status(order, status) {
    return this.patch(`${this.root}/orders/${order}/`, { status })
  }
}

export default Order;
