import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/login';

class Error404 extends Component {
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

Error404.propTypes = {
  simpleAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(Error404);
