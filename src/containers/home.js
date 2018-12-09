import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Header from '../components/header';
import { getStore } from '../actions/store';
import StoreCard from '../components/storeCard';
import Pagination from '../components/pagination';

import '../styles/home.scss';

class Home extends React.Component {
  componentWillMount() {
    const { getStore } = this.props;
    getStore();
  }

  render() {
    const {
      stores, isLoading, count, next, previous, getStore
    } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="store-show">
          <h2 className="store-title">Our Featured Stores</h2>
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
        <div className="store-pagination">
          <Pagination
            totalPage={Math.ceil(Number(count) / 10)}
            maxPageSize={10}
            nextPage={next}
            prevPage={previous}
            onPageChange={getStore}
          />
        </div>
      </React.Fragment>
    );
  }
}

Home.defaultProps = {
  next: undefined,
  previous: undefined
};

Home.propTypes = {
  getStore: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.number,
  previous: PropTypes.number
};

const mapStateToProps = ({ store }) => ({
  stores: store.stores,
  isLoading: store.isLoading,
  count: store.count,
  next: store.next,
  previous: store.previous
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStore
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
