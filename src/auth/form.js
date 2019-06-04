import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import {Route} from "react-router-dom";
import fire from '../config/fire';

class Form extends Component {

  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e, history) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      history.push('/');
    }).catch((error) => {
      this.setState({error: error.message});
    });
  }

  signup = (e, history) => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      history.push('/');
    }).catch((error) => {
      this.setState({error: error.message});
    });
  };

  handleSubmit = async (e, history) => {
    e.preventDefault();

    this.login(e, history);

    try {
      let { token } = await this.props.stripe.createToken({ name: this.state.email });
      await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      })
      // success redirect or whatever
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (
      <Route render={({ history}) => (
        <div className="Login-wrap">
          <form className="Login" onSubmit={e => this.handleSubmit(e, history)}>
            <h2 className="Login-title">Sign up to purchase decks!</h2>
            <input type="email" name="email" placeholder="Email" className="Login-input" onChange={e => this.handleChange(e)} />
            <input type="password" name="password" placeholder="Password" className="Login-input" onChange={e => this.handleChange(e)} />
            <div className="Login-btnWrap">
                <>
                  <button type="submit" className="Login-btn Login-btn--signIn">Sign In</button>
                  <button className="Login-btn Login-btn--signUp" >Sign Up!</button>
                </>
            </div>
            <CardElement />
            {this.state.error && <p>{this.state.error}</p>}
          </form>
        </div>
      )} />
    )
  }
}

export default injectStripe(Form);
