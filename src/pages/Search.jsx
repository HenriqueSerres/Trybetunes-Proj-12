import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      searchInput: '',
      albuns: ['xablau'],
      loading: false,
      albumSearched: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { searchInput } = this.state;
      const DOIS = 2;
      if (searchInput.length >= DOIS) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  searchButtonClick = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const albunsList = await searchAlbumsAPI(searchInput);
    this.setState((previusState) => ({
      albuns: [...albunsList],
      loading: false,
      searchInput: '',
      albumSearched: previusState.searchInput }));
  }

  render() {
    const { disabled, searchInput, albuns, loading, albumSearched } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        Search
        <Header />

        {loading ? (
          <Loading />
        ) : <input
          data-testid="search-artist-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
        />}
        {loading ? (
          ''
        ) : (
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.searchButtonClick }
          >
            Pesquisar
          </button>)}
        {albumSearched !== '' ? `Resultado de álbuns de: ${albumSearched}` : ''}
        {albuns.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
          : albuns.map((album) => (
            <div key={ album.collectionId }>
              <h2>{album.artistName}</h2>
              <h2>{album.collectionName}</h2>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                MÚSICAS
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
