import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as userAPI from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

fetchUserName = () => {
  userAPI.getUser().then((data) => this.setState({ names: data }));
}

render() {
  const { names } = this.state;
  console.log(names.name);
  return (
    <header data-testid="header-component">
      {names.length !== 0
        ? <span data-testid="header-user-name">{names.name}</span>
        : 'Carregando...'}

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
