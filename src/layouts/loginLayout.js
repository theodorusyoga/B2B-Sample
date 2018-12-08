import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkLogin } from '../actions/login';

import '../styles/login.scss';

class LoginLayout extends React.Component {
  componentWillMount() {
    const { checkLogin } = this.props;
    checkLogin();
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <main className="login-container">
          {children}
        </main>
      </div>
    );
  }
}

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  checkLogin: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkLogin
}, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(LoginLayout);
