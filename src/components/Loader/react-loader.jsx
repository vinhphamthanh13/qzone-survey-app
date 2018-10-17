import React from 'react';
import Pace from 'react-pace-progress';

class ReactLoader extends React.Component {
  style = {
    top: 0,
    position: 'fixed',
    width: '101%',
    left: 0,
    zIndex: 2000,
  };

  render() {
    return (
      <div className="sweet-loading" style={this.style}>
        <Pace color="#2196f3" height={4} />
      </div>
    );
  }
}

export default ReactLoader;
