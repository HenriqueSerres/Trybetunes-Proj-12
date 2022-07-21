import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    const userinfos = await getUser();
    this.setState({ user: userinfos });
  }

  render() {
    const { user } = this.state;
    return (
      <div
        data-testid="page-profile"
      >
        Profile
        <Header />
        {user === '' ? <Loading /> : <h2>{user.name}</h2>}
        {user !== '' && <h2>{user.email}</h2>}
        {user !== '' && <h2>{user.description}</h2>}
        {(user !== '' && user.image !== '')
        && <img data-testid="profile-image" src={ user.image } alt={ user.name } />}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
