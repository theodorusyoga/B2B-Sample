import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/login';

import '../styles/login.scss';

class Login extends Component {
  componentWillMount() {
  }

  render() {
    const { simpleAction } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src="" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
     To get started, edit
          {' '}
          <code>src/App.js</code>
          {' '}
and save to reload
        </p>
        <button type="button" onClick={simpleAction}>Test redux action</button>
      </div>
    );
  }
}

Login.propTypes = {
  simpleAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  simpleAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Login);
