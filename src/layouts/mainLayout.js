import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MainLayout extends React.Component {
  componentWillMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <main className="main">
          <div className="container container-main">
            {children}
          </div>
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired
};

const mapStateToProps = () => ({
});


export default connect(
  mapStateToProps
)(MainLayout);
