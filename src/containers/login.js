import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  Form, reduxForm, initialize
} from 'redux-form';
import { formValidation } from '../helpers/validation';

import '../styles/login.scss';

class Login extends Component {
  componentWillMount() {
    const { initialize } = this.props;
    initialize({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <Container className="login-box">
        <Form />
      </Container>
    );
  }
}

Login.propTypes = {
  initialize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initialize: data => initialize('login', data)
}, dispatch);

const loginForm = reduxForm({
  form: 'login',
  validate: formValidation
})(formValidation);


export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
