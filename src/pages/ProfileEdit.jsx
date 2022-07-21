import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../componets/Header';
import Loading from '../componets/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      pessoa: '',
      buttonIsDisabled: false,
      inputName: '',
      inputDesc: '',
      inputMail: '',
      inputImg: '',
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.atualizaPerfil();
  }

  atualizaPerfil = async () => {
    const editProfile = await getUser();
    this.setState({
      pessoa: editProfile,
      inputName: editProfile.name,
      inputDesc: editProfile.description,
      inputImg: editProfile.image,
      inputMail: editProfile.email,
    });
  }

  onSaveButtonClick = () => {
    const { inputName, inputMail, inputDesc, inputImg } = this.state;
    const objectUser = {
      name: inputName,
      email: inputMail,
      description: inputDesc,
      image: inputImg,
    };
    this.setState({ loading: true, redirect: true });
    updateUser(objectUser);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { inputName, inputMail, inputDesc, inputImg } = this.state;
      if (inputName !== ''
      && inputMail.includes('@')
      && inputMail.includes('.com')
      && inputDesc !== ''
      && inputImg !== '') {
        this.setState({ buttonIsDisabled: false });
      } else {
        this.setState({ buttonIsDisabled: true });
      }
    });
  }

  render() {
    const {
      redirect, pessoa, inputDesc, inputImg,
      inputMail, inputName, loading, buttonIsDisabled } = this.state;
    return (

      <div
        data-testid="page-profile-edit"
      >
        Profile Edit
        <Header />
        {pessoa === '' ? (
          <Loading />
        ) : (
          <section>
            <input
              type="text"
              name="inputName"
              value={ inputName }
              data-testid="edit-input-name"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="inputMail"
              value={ inputMail }
              data-testid="edit-input-email"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="inputDesc"
              value={ inputDesc }
              data-testid="edit-input-description"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="inputImg"
              value={ inputImg }
              data-testid="edit-input-image"
              onChange={ this.handleChange }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              onClick={ this.onSaveButtonClick }
              disabled={ buttonIsDisabled }
            >
              Salvar
            </button>
          </section>
        )}
        {loading && <Loading />}
        {redirect && <Redirect to="/profile" />}
      </div>

    );
  }
}
