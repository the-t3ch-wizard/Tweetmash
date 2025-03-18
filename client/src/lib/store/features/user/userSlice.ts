import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInStatus: false,
  userDetails: {
    _id: undefined,
    name: undefined,
    username: undefined,
    email: undefined,
  }
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedInStatus: (state, action) => {
      state.loggedInStatus = action.payload
    },
    clearUserLoggedInStatus: (state) => {
      state.loggedInStatus = false
    },
    setUserDetails: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
    clearUserDetails: (state) => {
      state.userDetails = initialState.userDetails;
    }
  },
})

export const { setUserLoggedInStatus, clearUserLoggedInStatus, setUserDetails, clearUserDetails } = counterSlice.actions

export default counterSlice.reducer;