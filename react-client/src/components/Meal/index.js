import React, { Component } from 'react';

import './Meal.css'

export default class Meal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="meal-view">
        <img src={this.props.meal.user.avatar_url} height="16px" width="16px"/> {this.props.meal.user.username} ordered {this.props.meal.name} (&euro;{this.props.meal.price})
      </div>
    )
  }
}
