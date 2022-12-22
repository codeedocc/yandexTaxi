import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedOption: '',
  disablerFrom: '',
  disablerTo: '',
  nextTravel: false,
  isLoading: true,
  isOrdered: false,
}

export const taxiSlice = createSlice({
  name: 'taxi',
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload
    },
    setDisablerFrom: (state, action) => {
      state.disablerFrom = action.payload
    },
    setDisablerTo: (state, action) => {
      state.disablerTo = action.payload
    },
    setNextTravel: (state, action) => {
      state.nextTravel = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsOrdered: (state, action) => {
      state.isOrdered = action.payload
    },
  },
})

export const {
  setSelectedOption,
  setDisablerFrom,
  setDisablerTo,
  setNextTravel,
  setIsLoading,
  setIsOrdered,
} = taxiSlice.actions
export default taxiSlice.reducer
