import React, { Component } from 'react'
import loading from './giphy.gif'
export  class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
            <img className='load'src={loading} alt="loading" style={{width:'150px'}} />
        </div>
      </div>
    )
  }
}
