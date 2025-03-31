import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInStatus: false,
  userDetails: {
    _id: undefined,
    name: undefined,
    email: undefined,
    twitterUsername: undefined,
    twitterConnected: false,
    planType: undefined,
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
    },
    setTwitterConnected: (state, action) => {
      state.userDetails.twitterConnected = action.payload
    },
    clearTwitterDetails: (state) => {
      state.userDetails.twitterConnected = false
      state.userDetails.twitterUsername = undefined
    },
  },
})

export const { setUserLoggedInStatus, clearUserLoggedInStatus, setUserDetails, clearUserDetails, setTwitterConnected, clearTwitterDetails } = counterSlice.actions

export default counterSlice.reducer;