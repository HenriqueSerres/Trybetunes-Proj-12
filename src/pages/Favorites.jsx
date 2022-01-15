import React from 'react';
import Header from '../componets/Header';

export default class Favorites extends React.Component {
  render() {
    return (
      <div
        data-testid="page-favorites"
      >
        Favorites
        <Header />
      </div>
    );
  }
}
