import React from "react";
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

class ReactLoader extends React.Component {

  render(){
    const override = css`
      display: flex;
      position: fixed;
      z-index: 999;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 50%;
      width: 50%;
    `;
    return(
      <div className='sweet-loading' >
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={75}
          color={'#123abc'}
          loading={this.props.loading}
        />
      </div>
    )
  }
}

export default ReactLoader