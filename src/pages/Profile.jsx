import React from 'react';
import Header from '../componets/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div
        data-testid="page-profile"
      >
        Profile
        <Header />
      </div>
    );
  }
}
