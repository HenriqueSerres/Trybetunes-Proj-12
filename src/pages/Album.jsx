import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../componets/Loading';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const albumMusics = await getMusics(id);
    this.setState({ musics: [...albumMusics] });
    const favoritas = await getFavoriteSongs();
    this.setState({ favorites: [...favoritas] });
  }

  render() {
    const { musics, favorites, loading } = this.state;
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        <h3>Album</h3>
        {musics.map((music, index) => (
          index === 0 ? (
            <div>
              <h2 data-testid="artist-name">{music.artistName}</h2>
              <h2 data-testid="album-name">{music.collectionName}</h2>
            </div>
          ) : (
            <section key={ music.trackName }>
              <h3>{music.trackName}</h3>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              Favoritas
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                checked={ favorites.find((msc) => msc.trackId === music.trackId) }
                onChange={ async (event) => {
                  if (event.target.checked) {
                    this.setState({ loading: true });
                    await addSong(music);
                    const favoritMusics = await getFavoriteSongs();
                    this.setState({ loading: false, favorites: [...favoritMusics] });
                  } else if (event.target.checked === false) {
                    this.setState({ loading: true });
                    await removeSong(music);
                    const favoritMusics = await getFavoriteSongs();
                    this.setState({ loading: false, favorites: [...favoritMusics] });
                  }
                } }
              />
            </section>)
        ))}
        {loading && <Loading />}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.string.isRequired,
};
