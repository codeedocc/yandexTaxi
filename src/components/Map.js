import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDisablerFrom,
  setDisablerTo,
  setIsLoading,
  setIsOrdered,
  setNextTravel,
  setSelectedOption,
} from '../store/slice'
import FromInput from './FromInput'
import Loader from './Loader'
import Options from './Options'

let center = { lat: 55.796391, lng: 49.108891 }

function Map() {
  const [list, setList] = useState()
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const dispatch = useDispatch()
  const disablerFrom = useSelector((state) => state.taxi.disablerFrom)
  const disablerTo = useSelector((state) => state.taxi.disablerTo)
  const isLoading = useSelector((state) => state.taxi.isLoading)
  const isOrdered = useSelector((state) => state.taxi.isOrdered)

  const mapRef = useRef()
  const originRef = useRef()
  const destinationRef = useRef()

  const onLoad = useCallback((map) => (mapRef.current = map), [])

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.value)
    dispatch(setSelectedOption(1))
    dispatch(setNextTravel(true))
    dispatch(setIsOrdered(true))
  }

  function nextTravelHandler() {
    setDirectionsResponse(null)
    setDistance(null)
    setDuration(null)
    dispatch(setNextTravel(false))
    dispatch(setDisablerFrom(false))
    dispatch(setDisablerTo(false))
    dispatch(setSelectedOption(''))
    dispatch(setIsOrdered(false))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setIsLoading(false))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      style={isLoading ? { backgroundSize: 'cover' } : { maxWidth: 480 }}
      className="mx-auto relative overflow-hidden"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            position: 'relative',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
          }}
        >
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              keyboardShortcuts: false,
              clickableIcons: false,
            }}
            onLoad={onLoad}
          >
            {directionsResponse && (
              <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  polylineOptions: {
                    strokeColor: '#0cbe59',
                    strokeWeight: 4,
                  },
                }}
              />
            )}
          </GoogleMap>

          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              bottom: '40px',
              width: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <FromInput
              originRef={originRef}
              destinationRef={destinationRef}
              duration={duration}
              distance={distance}
              setList={(position) => {
                setList(position)
                mapRef.current.panTo(position)
              }}
              nextTravelHandler={nextTravelHandler}
            />

            <Options duration={duration} />

            {isOrdered ? (
              <button
                className="rounded-2xl block w-2/3 p-3 text-lg font-medium mx-auto shadow-md transition-colors duration-300 ease-in-out"
                style={{ backgroundColor: '#fee000' }}
                onClick={nextTravelHandler}
              >
                <p>Следующая поездка</p>
              </button>
            ) : !disablerFrom || !disablerTo ? (
              <button
                className="rounded-2xl block w-2/3 p-3 text-lg font-medium mx-auto shadow-md transition-colors duration-300 ease-in-out"
                style={{ backgroundColor: '#eeeeee' }}
                disabled={true}
              >
                <p className="opacity-40">Заказать</p>
              </button>
            ) : (
              <button
                className="rounded-2xl block w-2/3 p-3 text-lg font-medium mx-auto shadow-md transition-colors duration-300 ease-in-out"
                style={{ backgroundColor: '#fee000' }}
                onClick={calculateRoute}
              >
                <p>Заказать</p>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Map
