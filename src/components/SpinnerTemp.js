import React, { Component } from 'react'
import loading from'./loading.gif';
//import Spinner from '/Spinner';

export class SpinnerTemp extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-2' src={loading} alt="loading"/>
      </div>
    )
  }
}

export default SpinnerTemp
