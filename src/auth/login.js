import React, { Component } from 'react';
import fire from '../config/fire';
import Form from './form';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './login.scss';

export class Login extends Component {

  render() {
    return (
      <StripeProvider apiKey="pk_test_ZWmVelRqEpVF1yGEpwlPyVIc00BdFJD6I9">
        <Elements>
          <Form />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Login;
