import React, { Component } from 'react';

import './UserBar.css'

class UserBar extends Component {
  render() {
    return (
      <div className="user-bar">
        <img src={this.props.user.avatar_url} width="42px" height="42px"/>
        <span>{this.props.user.username}</span>
        <form class="button_to" method="post" action="/signout">
          <input type="hidden" name="_method" value="delete"/>
          <input type="submit" value="Sign Out"/>
          <input type="hidden" name="authenticity_token" value="yGlYbNUCsOwzUapb2rytUx6L4IDcKEaN8+XOWOcc2I2JMwolhy85dlzvDkAQgbQ+oNG9Hu4I8GMIhSq7JXjRfw=="/>
        </form>
      </div>
    );
  }
}

export default UserBar;
