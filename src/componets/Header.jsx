import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/search" data-testid="link-to-search">
        Search
      </Link>
      <Link to="/favorites" data-testid="link-to-favorites">
        Favorites
      </Link>
      <Link to="/profile" data-testid="link-to-profile">
        Profile
      </Link>
    </header>
  );
}
}
