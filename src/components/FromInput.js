import React, { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import ToInput from './ToInput'
import { useDispatch, useSelector } from 'react-redux'
import { setDisablerFrom } from '../store/slice'

function FromInput({ originRef, destinationRef, duration, distance, setList }) {
  const dispatch = useDispatch()
  const nextTravel = useSelector((state) => state.taxi.nextTravel)

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val) => {
    setValue(val, false)
    clearSuggestions()

    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    setList({ lat, lng })

    dispatch(setDisablerFrom(val))
  }

  useEffect(() => {
    if (!nextTravel) {
      setValue('')
    }
  }, [nextTravel])

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <div className="bg-white rounded-lg py-4 px-5 shadow-lg flex items-center">
          <FiSearch color={'#ffbc00'} className="mr-3" size={26} />
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Откуда?"
            ref={originRef}
            className="outline-none w-full text-gray-800"
          />
          <ComboboxPopover
            style={{
              zIndex: 20,
            }}
          >
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </div>
        <br></br>
      </Combobox>
      <ToInput
        destinationRef={destinationRef}
        duration={duration}
        distance={distance}
      />
    </div>
  )
}

export default FromInput
