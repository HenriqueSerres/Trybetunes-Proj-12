import React from 'react';
import Header from '../componets/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    this.setState({ musics: albumMusics });
  }

  render() {
    const { musics } = this.state;
    return (
      <div
        key={ Math.random() }
        data-testid="page-album"
      >
        <Header />
        Album
        {musics.map((music, index) => (
          index === 0 ? (
            <div>
              <h2 data-testid="artist-name">{music.artistName}</h2>
              <h2 data-testid="album-name">{music.collectionName}</h2>
            </div>)
            : (
              <section key={ music.artistId }>
                <h3>{music.artistName}</h3>
                <h4>{music.collectionName}</h4>
                <li>
                  {music.trackName}
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                </li>
              </section>)
        ))}
      </div>
    );
  }
}
