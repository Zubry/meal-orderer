import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MonterailAPI from './api';

const api = new MonterailAPI('http://localhost:3000/api/v1');

import UserBar from './components/UserBar';
import OrderList from './components/OrderList';
import OrderViewer from './components/OrderViewer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {}, route: 'list-orders', routeState: null };
    this.router = this.router.bind(this);
  }

  componentDidMount() {
    api
      .user
      .me()
      .then((user) => this.setState({ user }));
  }

  router(route, routeState) {
    this.setState({ route, routeState });
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <UserBar user={this.state.user}/>

          {this.state.route === 'list-orders' && <OrderList user={this.state.user} router={this.router}/>}
          {this.state.route === 'view-order' && <OrderViewer order={this.state.routeState} user={this.state.user} router={this.router}/>}
        </div>
      );
    }

    return <div></div>
  }
}

export default App;
