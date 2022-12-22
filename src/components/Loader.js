import React from 'react'
import preloaderImage from '../assets/images/preloader.jpg'

function Loader() {
  return (
    <div>
      <img
        src={preloaderImage}
        alt="preloader"
        style={{ height: '100vh', width: '100%' }}
      ></img>
    </div>
  )
}

export default Loader
