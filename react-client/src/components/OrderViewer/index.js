import React, { Component } from 'react';

import './OrderViewer.css'

import Order from './../Order';
import Meal from './../Meal';

import MonterailAPI from './../../api';

const api = new MonterailAPI('https://meal-orderer.herokuapp.com/api/v1');

export default class OrderViewer extends Component {
  constructor(props) {
    super(props);

    this.state = { meals: [], meal_name: '', meal_price: 0 };

    this.clickOrderHeader = this.clickOrderHeader.bind(this);
    this.changeMealName = this.changeMealName.bind(this);
    this.changeMealPrice = this.changeMealPrice.bind(this);
    this.addMeal = this.addMeal.bind(this);
  }

  componentDidMount() {
    api
      .order
      .meals(this.props.order.id)
      .then(meals => this.setState({ meals }));
  }

  date(d) {
    const date = new Date(Date.parse(d));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  clickOrderHeader(order) {
    this.props.router('list-orders', null);
  }

  addMeal() {
    api
      .order
      .order_meal(this.props.order.id, this.state.meal_name, this.state.meal_price)
      .then(meals => this.setState({ meals }));
  }

  changeMealName(e) {
    this.setState({ meal_name: e.target.value });
  }

  changeMealPrice(e) {
    this.setState({ meal_price: e.target.value });
  }

  render() {
    return (
      <div className="order-viewer">
        <div className="meal-adder">
          <input placeholder="Meal" value={this.state.meal_name} onChange={this.changeMealName}></input>
          <input placeholder="Price" value={this.state.meal_price} onChange={this.changeMealPrice} type="number"></input>
          <button onClick={this.addMeal}>+</button>
        </div>
        <Order order={this.props.order} click={this.clickOrderHeader} />
        <div className="meals">
          {
            this.state.meals
              .map((meal, i) => <Meal key={i} meal={meal}/>)
          }
        </div>
      </div>
    )
  }
}
