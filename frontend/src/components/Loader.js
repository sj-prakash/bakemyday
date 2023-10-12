import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (

    <div className='spinner-div'>
        <Spinner animation='border' role='status' style={{width: '50px', height: '50px', display:'block'}}>
            <span className='sr-only'>Loading...</span>
        </Spinner>
    </div>
  )
}

export default Loader
