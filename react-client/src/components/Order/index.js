import React, { Component } from 'react';

import './Order.css'

import MonterailAPI from './../../api';

const api = new MonterailAPI('http://localhost:3000/api/v1');

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOrderStatusChange = this.onOrderStatusChange.bind(this);
    this.onOrderStatusSubmit = this.onOrderStatusSubmit.bind(this);

    this.state = { status: this.props.order.status };
  }

  onOrderStatusChange(e) {
    this.setState({ status: e.target.value });
  }

  onOrderStatusSubmit() {
    api
      .order
      .set_status(this.props.order.id, this.state.status);
  }

  date(d) {
    const date = new Date(Date.parse(d));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  handleClick() {
    return this.props.click(this.props.order);
  }

  render() {
    return (
      <div data-status={this.props.order.status} data-me={this.props.order.me} className="order">
        <div onClick={this.handleClick} className="restaurant-wrapper">
          <img src={this.props.order.user.avatar_url} height="32px" width="32px"/>
          <span className="restaurant">{this.props.order.restaurant}</span>
          <span className="date">{this.date(this.props.order.created_at)}</span>
        </div>
        {
          this.props.order.me &&
          <div className="options-wrapper">
            <select onChange={this.onOrderStatusChange} value={this.state.status}>
              <option value="open">Open</option>
              <option value="finalized">Finalized</option>
              <option value="ordered">Ordered</option>
              <option value="delivered">Delivered</option>
            </select>
            <button onClick={this.onOrderStatusSubmit}>➔</button>
          </div>
        }
      </div>
    )
  }
}
