import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  serverRunning: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setServerRunningStatus: (state, action) => {
      state.serverRunning = action.payload
    },
    clearServerRunningStatus: (state) => {
      state.serverRunning = false
    },
  },
})

export const { setServerRunningStatus, clearServerRunningStatus } = appSlice.actions

export default appSlice.reducer;