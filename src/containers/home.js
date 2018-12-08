import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header';

import '../styles/home.scss';

class Home extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Header />
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
