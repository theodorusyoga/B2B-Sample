import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import Rating from 'react-star-ratings';

import '../styles/card.scss';

const StoreCard = ({
  imageUrl, title, description, location, link, rating, goTo
}) => (
  <div
    className="store-card"
    onClick={() => goTo(link)}
    role="presentation"
  >
    <Card>
      <CardImg
        width="100%"
        src={imageUrl}
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{description}</CardSubtitle>
        <div className="store-rating">
          <Rating
            rating={rating}
            numberOfStars={5}
            isSelectable={false}
            starRatedColor="#efab18"
            starSpacing="3px"
          />
        </div>
      </CardBody>
    </Card>
  </div>
);

StoreCard.defaultProps = {
  rating: 5
};

StoreCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
  rating: PropTypes.number
};

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo: link => (dispatch) => {
    dispatch(push(link));
  }
}, dispatch);

export default connect(
  null, mapDispatchToProps
)(StoreCard);
