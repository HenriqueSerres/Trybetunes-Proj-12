import React from 'react';
import propTypes from 'prop-types';
import Header from '../componets/Header';
import getMusics from '../services/musicsAPI';
import * as songsAPI from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: false,
      favorites: [],
      loading2: true,
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    this.setState({ musics: albumMusics });
    const favoritas = await songsAPI.getFavoriteSongs();
    this.setState({ loading2: false, favorites: [...favoritas] });
  }

  fetchFavoritSong = async (event, music) => {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      this.setState({ loading: true });
      await songsAPI.addSong(music);
      const favoritMusics = await songsAPI.getFavoriteSongs();
      this.setState({ loading: false, favorites: [...favoritMusics] });
    } else if (event.target.checked === false) {
      this.setState({ loading: true });
      await songsAPI.removeSong(music);
      const favoritMusics = await songsAPI.getFavoriteSongs();
      this.setState({ loading: false, favorites: [...favoritMusics] });
    }
  }

  render() {
    const { musics, favorites, loading, loading2 } = this.state;
    return (
      <div
        key={ Math.random() }
        data-testid="page-album"
      >
        <Header />
        Album
        {loading && 'Carregando...'}
        {musics.length > 0
        && musics.map((music, index) => (
          index === 0 ? (
            <div>
              <h2 data-testid="artist-name">{music.artistName}</h2>
              <h2 data-testid="album-name">{music.collectionName}</h2>
            </div>)
            : (
              <section key={ Math.random() }>
                <h3>{music.artistName}</h3>
                <h4>{music.collectionName}</h4>
                <h2>{music.trackName}</h2>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

                <label
                  htmlFor="favorita"
                >
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id="favorita"
                    checked={ favorites.find((msc) => msc.trackId === music.trackId) }
                    onChange={ (event) => { this.fetchFavoritSong(event, music); } }

                  />

                </label>
              </section>)
        ))}
        {loading2 && 'Carregando...'}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.arrayOf(propTypes.object).isRequired,
  params: propTypes.arrayOf(propTypes.object).isRequired,
  id: propTypes.number.isRequired,
};
