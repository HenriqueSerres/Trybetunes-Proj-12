import React, { Component } from 'react';
import * as userAPI from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      names: '',
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

fetchUserName = async () => {
  this.setState({ loading: true });
  const names = await userAPI.getUser();
  this.setState({ names, loading: false });
}

render() {
  const { loading, names } = this.state;
  return (
    <header data-testid="header-component">
      <span data-testid="header-user-name">
        {loading ? <Loading /> : names.name}
      </span>
    </header>
  );
}
}
