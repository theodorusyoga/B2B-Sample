import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import Rating from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faPhone, faUser, faArchive
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/loader';
import StoreCard from '../components/storeCard';
import { getStoreDetail, getStore } from '../actions/store';

import '../styles/store.scss';

class StoreDetails extends React.Component {
  async componentWillMount() {
    const { match, getStoreDetail, getStore } = this.props;
    getStore();
    await getStoreDetail(match.params.id);
  }

  async componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    if (nextProps.match !== match) {
      const { getStoreDetail } = this.props;
      await getStoreDetail(nextProps.match.params.id);
    }
  }

  render() {
    const {
      storeDetails, isStoreLoading, isLoading, stores
    } = this.props;
    return (
      <Container className="store-details">
        <Row>
          <Col xs="12" sm="12" md="8" lg="8">
            {
            isStoreLoading
              ? (
                <Loader />
              )
              : (
                <div className="store-details-left">
                  <div className="store-details-header">
                    <img src={`/img/${storeDetails.type}.jpg`} alt={storeDetails.name} />
                  </div>
                  <div className="store-details-title">
                    <Row>
                      <Col xs="6">
                        <h3>{storeDetails.name}</h3>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Rating
                          rating={5}
                          numberOfStars={5}
                          isSelectable={false}
                          starRatedColor="#efab18"
                          starSpacing="3px"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col><p>{storeDetails.description}</p></Col>
                    </Row>
                  </div>
                  <div className="store-details-content">
                    <Row>
                      <Col xs="6">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        Address
                        <p>{storeDetails.address}</p>
                      </Col>
                      <Col xs="6">
                        <FontAwesomeIcon icon={faPhone} />
                        Phone
                        <p>{storeDetails.phone}</p>
                      </Col>
                      <Col xs="6">
                        <FontAwesomeIcon icon={faUser} />
                        Owner
                        <p>{storeDetails.owner}</p>
                      </Col>
                      <Col xs="6">
                        <FontAwesomeIcon icon={faArchive} />
                        Business Type
                        <p>{storeDetails.type}</p>
                      </Col>
                    </Row>
                  </div>
                </div>
              )
          }

          </Col>
          <Col xs="12" sm="12" md="4" lg="4">
            <p>Suggested Stores</p>
            {
              isLoading
                ? (
                  <Loader />
                ) : (
                  <Row className="suggested-stores">
                    {
                    stores.map(val => (
                      <Col className="store-col" key={val.id} xs="6" sm="6" md="6" lg="6">
                        <StoreCard
                          imageUrl={`/img/${val.type}.jpg`}
                          title={val.name}
                          link={`/store/${val.id}`}
                        />
                      </Col>
                    ))
                  }
                  </Row>
                )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

StoreDetails.propTypes = {
  getStoreDetail: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  storeDetails: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isStoreLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ store }) => ({
  storeDetails: store.storeDetails,
  stores: store.stores,
  isLoading: store.isLoading,
  isStoreLoading: store.isStoreLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStoreDetail,
  getStore
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
