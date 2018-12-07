import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Form, Button } from 'reactstrap';
import { Formik } from 'formik';
import Textbox from '../components/textbox';
import { formValidation } from '../helpers/validation';
import { onLoginFormSubmit } from '../actions/login';

import '../styles/login.scss';

const initialData = {
  username: '',
  password: ''
};

class Login extends Component {
  componentWillMount() {
  }

  render() {
    const { onLoginFormSubmit } = this.props;
    return (
      <Container className="login-box">
        <div className="login-header text-center">
          <img className="mb-3" src="/img/stoqo.png" alt="Stoqo" width="75" />
          <h4 className="mb-4">Login with your account</h4>
        </div>
        <Formik
          initialValues={initialData}
          validate={formValidation}
          onSubmit={onLoginFormSubmit}
        >
          {
          ({
            values, errors, touched, handleChange, handleBlur,
            handleSubmit, isSubmitting
          }) => (
            <Form className="login-form" onSubmit={handleSubmit}>
              <Textbox
                label="Username"
                id="username"
                name="username"
                value={values.username}
                touched={touched.username}
                error={errors && errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Textbox
                label="Password"
                id="password"
                name="password"
                type="password"
                value={values.password}
                touched={touched.password}
                error={errors && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <div className="form-group text-center">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="login-btn"
                >
                  Login
                </Button>
              </div>
            </Form>
          )
        }
        </Formik>
        <div className="login-footer text-center">
          Don&#39;t have an account?&nbsp;
          <a href="/">Register</a>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoginFormSubmit
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
