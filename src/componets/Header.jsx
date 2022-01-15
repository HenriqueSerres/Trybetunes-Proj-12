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
      searchInput: '',
      disabled: true,
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

handleChange = (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value }, () => {
    const { searchInput } = this.state
    const DOIS = 2;
    if (searchInput.length >= DOIS) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  });
}

render() {
  const { loading, names, searchInput, disabled } = this.state;
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
      <input
        data-testid="search-artist-input"
        type="text"
        name="searchInput"
        value={ searchInput }
        onChange={ this.handleChange }
      />
      <button
        type="button"
        data-testid="search-artist-button"
        disabled={ disabled }
      >
        Pesquisar
      </button>
    </header>
  );
}
}
