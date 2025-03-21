import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  connectionStage: 1,
  oauth_token: "",
}

export const connectTwitterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading = action.payload
    },
    clearLoadingStatus: (state) => {
      state.loading = false
    },
    setConnectionStage: (state, action) => {
      state.connectionStage = action.payload
    },
    setOauthToken: (state, action) => {
      state.oauth_token = action.payload
    }
  },
})

export const { setLoadingStatus, clearLoadingStatus, setConnectionStage, setOauthToken } = connectTwitterSlice.actions

export default connectTwitterSlice.reducer
