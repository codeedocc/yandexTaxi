import { useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import Map from './components/Map'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_SECRET_KEY,
    libraries: ['places'],
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <Provider store={store}>
      <Map />
    </Provider>
  )
}

export default App
