import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error404 extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          This is 404 page
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Error404);
