import React from 'react'
import { optionList } from './data'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedOption } from '../store/slice'

function Options({ duration }) {
  const dispatch = useDispatch()
  const selectedOption = useSelector((state) => state.taxi.selectedOption)
  const disablerFrom = useSelector((state) => state.taxi.disablerFrom)
  const disablerTo = useSelector((state) => state.taxi.disablerTo)
  const isOrdered = useSelector((state) => state.taxi.isOrdered)

  function optionHandler(id) {
    dispatch(setSelectedOption(id))
  }

  return (
    <div className="flex overflow-x-scroll hide-scroll-bar my-5">
      <div className="flex flex-nowrap gap-3">
        {!isOrdered || !disablerFrom || !disablerTo
          ? optionList.map((option) => (
              <button
                className="inline-block rounded-xl py-2 px-4 outline-none bg-white overflow-hidden"
                style={{ minWidth: '70px' }}
                key={option._id}
                onClick={() => duration && optionHandler(option._id)}
                disabled={true}
              >
                <div
                  className={cn(
                    'opacity-30 text-left transition-opacity duration-300 ease-in-out',
                    {
                      'opacity-100': option._id === selectedOption,
                    }
                  )}
                >
                  <img
                    src={option.img}
                    width={70}
                    height={70}
                    alt="Картинка тарифа"
                  />
                  <div className="text-sm -mt-1" style={{ color: '#222' }}>
                    {option.title}
                  </div>
                  <div className="text-md font-medium">
                    {new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                    }).format((duration * option.multiplier) / 60)}
                  </div>
                </div>
              </button>
            ))
          : optionList.map((option) => (
              <button
                className="inline-block rounded-xl py-2 px-4 outline-none bg-white overflow-hidden"
                style={{ minWidth: '70px' }}
                key={option._id}
                onClick={() => duration && optionHandler(option._id)}
              >
                <div
                  className={cn(
                    'opacity-30 text-left transition-opacity duration-300 ease-in-out',
                    {
                      'opacity-100': option._id === selectedOption,
                    }
                  )}
                >
                  <img
                    src={option.img}
                    width={70}
                    height={70}
                    alt="Картинка тарифа"
                  />
                  <div className="text-sm -mt-1" style={{ color: '#222' }}>
                    {option.title}
                  </div>
                  <div className="text-md font-medium">
                    {new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                    }).format((duration * option.multiplier) / 60)}
                  </div>
                </div>
              </button>
            ))}
      </div>
    </div>
  )
}

export default Options
