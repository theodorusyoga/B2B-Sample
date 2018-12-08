import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container, Form, Button, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import Textbox from '../components/textbox';
import { formValidation } from '../helpers/validation';
import { onLoginFormSubmit } from '../actions/login';

const initialData = {
  username: '',
  password: ''
};

class Login extends Component {
  componentWillMount() {
  }

  render() {
    const { onLoginFormSubmit, warning } = this.props;
    return (
      <Container className="login-box">
        <div className="login-header text-center">
          <img className="mb-3" src="/img/stoqo.png" alt="Stoqo" width="75" />
          <h4 className="mb-4">Login with your account</h4>
        </div>
        {
          warning.map((val, i) => (
            <Alert key={i} color="danger">
              {val}
            </Alert>
          ))
        }
        <Formik
          initialValues={initialData}
          validate={formValidation}
          onSubmit={onLoginFormSubmit}
        >
          {
          ({
            values, errors, touched, handleChange, handleBlur,
            handleSubmit, isSubmitting
          }) => (isSubmitting ? (
            <div className="text-center">
              <img src="/img/loading.svg" alt="Loading" />
            </div>
          )
            : (
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
                <div className="login-footer text-center">
                  Don&#39;t have an account?&nbsp;
                  <a href="/">Register</a>
                </div>
              </Form>
            ))
        }
        </Formik>

      </Container>
    );
  }
}

Login.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  warning: PropTypes.array.isRequired
};

const mapStateToProps = ({ login }) => ({
  warning: login.warning
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoginFormSubmit
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
