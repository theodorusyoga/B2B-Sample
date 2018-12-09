import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import { goTo } from '../actions/login';

import '../styles/404.scss';

class Error404 extends Component {
  componentWillMount() {
  }

  render() {
    const { goTo } = this.props;
    return (
      <Container className="error-404">
        <FontAwesomeIcon icon={faSadTear} size="5x" />
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Button onClick={() => goTo('/')}>Go Back</Button>
      </Container>
    );
  }
}

Error404.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Error404);
