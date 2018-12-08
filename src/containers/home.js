import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Header from '../components/header';
import { getStore } from '../actions/store';
import StoreCard from '../components/storeCard';

import '../styles/home.scss';

class Home extends React.Component {
  componentWillMount() {
    const { getStore } = this.props;
    getStore();
  }

  render() {
    const { stores, isLoading } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="product-show">
          <h2 className="product-title">Our Featured Stores</h2>
          {
        isLoading
          ? (
            <div className="text-center">
              <img src="/img/loading.svg" alt="Loading" />
            </div>
          )
          : (
            <Row>
              {
                stores.map(val => (
                  <Col className="store-col" key={val.id} xs="12" sm="12" md="4" lg="4">
                    <StoreCard
                      imageUrl={`/img/${val.type}.jpg`}
                      title={val.name}
                      description={val.description}
                      link={`/store/${val.id}`}
                    />
                  </Col>
                ))
              }
            </Row>
          )
      }
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getStore: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ store }) => ({
  stores: store.stores,
  isLoading: store.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStore
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
