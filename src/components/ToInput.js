import React, { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import usePlacesAutocomplete from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDisablerTo } from '../store/slice'

function ToInput({ destinationRef, duration, distance }) {
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
    dispatch(setDisablerTo(val))
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
          <FiSearch color={'#615f5d'} className="mr-3" size={26} />
          <span>
            <ComboboxInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              placeholder="Куда?"
              ref={destinationRef}
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
          </span>
          <p className="absolute right-10 text-sm text-gray-400">
            {duration && <strong>{(duration / 60).toFixed()} мин.</strong>}
            &nbsp;
            {distance && `(${distance})`}
          </p>
        </div>
      </Combobox>
    </div>
  )
}

export default ToInput
