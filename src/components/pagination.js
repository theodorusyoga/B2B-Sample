import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '../styles/paging.scss';

class Pagination extends React.Component {
  componentWillMount() {
    const {
      onPageChange, totalPage, nextPage, prevPage
    } = this.props;

    this.renderElements(nextPage, prevPage, onPageChange, totalPage);
  }

  componentWillReceiveProps(nextProps) {
    const {
      nextPage, prevPage, totalPage
    } = this.props;
    if (nextPage !== nextProps.nextPage
      || prevPage !== nextProps.prevPage
      || totalPage !== nextProps.totalPage) {
      const {
        nextPage, prevPage, onPageChange, totalPage
      } = nextProps;
      this.renderElements(nextPage, prevPage, onPageChange, totalPage);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const {
      onPageChange, totalPage, nextPage, prevPage
    } = this.props;
    this.renderElements(nextPage, prevPage, onPageChange, totalPage);
  }

  renderElements = (nextPage, prevPage, onPageChange, totalPage) => {
    const elements = [];

    const prevElement = (
      <li key="prev" className={`page-item prev${prevPage === undefined ? ' disabled' : ''}`}>
        <button type="button" className="page-link" onClick={() => onPageChange('previous')} tabIndex="-1">
          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
        </button>
      </li>
    );
    elements.push(prevElement);

    const element = (
      <p className="paging-mobile" key="1">
        <span className="current-page">
          {prevPage ? (prevPage + 1)
            : (nextPage ? (nextPage - 1) : 1)}
        </span>
          /
        <span className="total-page">{totalPage}</span>
      </p>
    );
    elements.push(element);

    const nextElement = (
      <li key="next" className={`page-item next${nextPage === undefined ? ' disabled' : ''}`}>
        <button type="button" className="page-link" onClick={() => onPageChange('next')} tabIndex="-1">
          <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </button>
      </li>
    );
    elements.push(nextElement);


    this.setState({
      elements
    });
  }

  render() {
    const { elements } = this.state;

    return (
      <ul className="pagination custom-pagination mobile">
        {elements}
      </ul>
    );
  }
}

Pagination.defaultProps = {
  nextPage: undefined,
  prevPage: undefined
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  nextPage: PropTypes.number,
  prevPage: PropTypes.number
};

export default Pagination;
