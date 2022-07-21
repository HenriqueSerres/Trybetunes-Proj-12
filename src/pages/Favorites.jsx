import React from 'react';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritas: [],
    };
  }

  componentDidMount() {
    this.favoriteList();
  }

  favoriteList = async () => {
    this.setState({ loading: true });
    const favoritSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoritas: [...favoritSongs] });
  }

  render() {
    const { favoritas, loading } = this.state;
    return (
      <div
        data-testid="page-favorites"
      >
        Favorites
        <Header />
        {loading && <Loading />}
        {favoritas.length > 0
         && favoritas.map((music) => (
           <section key={ music.trackId }>
             <h2>{music.artistName}</h2>
             <h2>{music.collectionName}</h2>
             <h2>{music.trackName}</h2>
             <audio data-testid="audio-component" src={ music.previewUrl } controls>
               <track kind="captions" />
               O seu navegador não suporta o elemento
               {' '}
               <code>audio</code>
               .
             </audio>
             <label htmlFor="favorita">
               Favorita
               <input
                 type="checkbox"
                 id="favorita"
                 checked={ favoritas.find((msc) => msc.trackId === music.trackId) }
                 onChange={ async (event) => {
                   if (event.target.checked) {
                     this.setState({ loading: true });
                     await addSong(music);
                     const favoritMusics = await getFavoriteSongs();
                     this.setState({ loading: false, favoritas: [...favoritMusics] });
                   } else if (event.target.checked === false) {
                     this.setState({ loading: true });
                     await removeSong(music);
                     const favoritMusics = await getFavoriteSongs();
                     this.setState({ loading: false, favoritas: [...favoritMusics] });
                   }
                 } }
               />
             </label>
           </section>
         ))}
      </div>
    );
  }
}
