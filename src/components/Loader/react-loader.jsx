import React from 'react';
import PropTypes from 'prop-types';
import Pace from 'react-pace-progress';

class ReactLoader extends React.Component {
  style = {
    top: 0,
    position: 'relative',
    width: '101%',
    left: 0,
    zIndex: 2000,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="sweet-loading" style={this.style}>
        {loading && <Pace color="#2196f3" height={4} />}
      </div>
    );
  }
}

export default ReactLoader;
