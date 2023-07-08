import React, { Component } from 'react'
import loading from './giphy.gif'

const Spinner = () =>
{
    return (
        <div className="text-center">
            <img className='load'src={loading} alt="loading" style={{width:'150px'}} />
        </div>
  
    )
  }

  export default Spinner