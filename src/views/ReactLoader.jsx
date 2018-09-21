import React from "react";
import Pace from 'react-pace-progress'

class ReactLoader extends React.Component {

  render(){
    const style = {
      top: '0',
      position: 'absolute',
      width: '101%',
      left: '0'
    }

    return(
      <div className='sweet-loading' style={style}>
        <Pace color="#ffffff" height='3px' />
      </div>
    )
  }
}

export default ReactLoader