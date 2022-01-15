import React from 'react';
import Header from '../componets/Header';

export default class Search extends React.Component {
  render() {
    return (
      <div
        data-testid="page-search"
      >
        Search
        <Header />
      </div>
    );
  }
}
