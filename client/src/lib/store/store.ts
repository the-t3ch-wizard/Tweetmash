import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import appReducer from "./features/app/appSlice"
import userReducer from "./features/user/userSlice"
import connectTwitterReducer from "./features/connectTwitter/connectTwitterSlice"
import tweetReducer from "./features/tweet/tweetSlice"

const rootReducer = combineReducers({
  // reducer made for testing purpose
  counter: counterReducer,
  
  app: appReducer,
  user: userReducer,
  connectTwitter: connectTwitterReducer,
  tweet: tweetReducer,

})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store