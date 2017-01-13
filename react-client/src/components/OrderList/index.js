import React, { Component } from 'react';

import './OrderList.css'

import MonterailAPI from './../../api';

const api = new MonterailAPI('https://meal-orderer.herokuapp.com/api/v1');

import Order from './../Order';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: null, order: null };
    this.handleClick = this.handleClick.bind(this);
    this.changeRestaurantName = this.changeRestaurantName.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.onOrderListChange = this.onOrderListChange.bind(this);
  }

  componentDidMount() {
    api
      .order
      .all()
      .then(orders => orders.map(o => { o.me = o.user.uid === this.props.user.uid; return o}))
      .then(orders => this.setState({ orders }));
  }

  addOrder() {
    api
      .order
      .place(this.state.restaurant_name)
      .then(orders => orders.map(o => { o.me = o.user.uid === this.props.user.uid; return o}))
      .then(orders => this.setState({ orders }));
  }

  changeRestaurantName(e) {
    this.setState({ restaurant_name: e.target.value });
  }

  onOrderListChange(e) {
    const type = e.target.value;

    switch (type) {
      case '1': api
        .order
        .all()
        .then(orders => orders.map(o => { o.me = o.user.uid === this.props.user.uid; return o}))
        .then(orders => this.setState({ orders }));
        break;
      case '2': api
        .order
        .active()
        .then(orders => orders.map(o => { o.me = o.user.uid === this.props.user.uid; return o}))
        .then(orders => this.setState({ orders }));
        break;
      case '3': api
        .order
        .archived()
        .then(orders => orders.map(o => { o.me = o.user.uid === this.props.user.uid; return o}))
        .then(orders => this.setState({ orders }));
        break;
    }
  }

  handleClick(order) {
    this.props.router('view-order', order);
    this.setState({ order });
  }

  render() {
    if (this.state.orders) {
      return (
        <div className="order-list-wrapper">
          <h1><select onChange={this.onOrderListChange}><option value="1">All</option><option value="2">Active</option><option value="3">Archived</option></select> Orders</h1>
          <div className="order-list">
            <div className="order-adder">
              <input placeholder="Add a restaurant" value={this.state.restaurant_name} onChange={this.changeRestaurantName}></input>
              <button onClick={this.addOrder}>+</button>
            </div>
            {
              this.state.orders
                .map((o, i) => <Order key={i} order={o} click={this.handleClick}></Order>)
            }
          </div>
        </div>
      );
    }

    return <div>Loading...</div>
  }
}

export default OrderList;
