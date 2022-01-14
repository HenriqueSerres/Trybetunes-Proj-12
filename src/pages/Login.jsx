import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../componets/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      userName: '',
      loading: false,
      redirect: false,
    };
  }

 handleChange = (e) => {
   const { isDisabled } = this.state;
   const inputName = e.target.value;
   const TRES = 3;
   if (inputName !== undefined) {
     this.setState({
       isDisabled: isDisabled && inputName.length < TRES,
       userName: inputName,
     });
   }
 }

 render() {
   const { userName, isDisabled, loading, redirect } = this.state;

   return (
     <div data-testid="page-login">
       <form>
         <label htmlFor="login-name-input">
           User Name
           <input
             type="text"
             name="userName"
             value={ userName }
             onChange={ this.handleChange }
             data-testid="login-name-input"
           />
         </label>
         <button
           type="button"
           disabled={ isDisabled }
           onClick={ async () => {
             this.setState({ loading: true });
             await createUser({ name: userName });
             this.setState({ redirect: true });
           } }
           data-testid="login-submit-button"
         >
           Entrar
         </button>
         {loading && <Loading />}
         {redirect && <Redirect to="/search" />}
       </form>
     </div>
   );
 }
}
