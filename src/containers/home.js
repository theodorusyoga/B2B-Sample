import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import Header from '../components/header';
import { getStore, setFilterType } from '../actions/store';
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
      stores, isLoading, count, next, previous, getStore, filterType,
      setFilterType
    } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="store-show">
          <h2 className="store-title">Our Featured Stores</h2>
          <div className="filter text-right">
            Filter by type:&nbsp;&nbsp;
            <Input
              type="select"
              onChange={setFilterType}
              value={filterType}
            >
              <option value="">All</option>
              <option value="cafe">Cafe</option>
              <option value="delivery">Delivery</option>
              <option value="dineout">Dine Out</option>
            </Input>
          </div>
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
  setFilterType: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  next: PropTypes.number,
  previous: PropTypes.number
};

const mapStateToProps = ({ store }) => ({
  stores: store.stores,
  isLoading: store.isLoading,
  count: store.count,
  next: store.next,
  previous: store.previous,
  filterType: store.filterType
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStore,
  setFilterType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
