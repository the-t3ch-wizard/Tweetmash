import { getAllTweets } from "@/services/twitter";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweets: [{
    _id: undefined,
    tweetId: undefined,
    content: undefined,
    status: undefined,
    scheduledTime: undefined,
    createdAt: undefined,
  }],
}

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.tweets = action.payload
    },
    clearTweets: (state) => {
      state.tweets = []
    },
    addOneTweet: (state, action) => {
      if (state.tweets.length == 1 && state.tweets[0].tweetId == undefined) {
        state.tweets = [action.payload]
      } else state.tweets = [action.payload, ...state.tweets]
    },
    removeTweetUsingId: (state, action) => {
      state.tweets = state.tweets.filter((tweet: { _id: string | undefined; }) => tweet._id !== action.payload)
    },
  },
})

export const { setTweets, clearTweets, addOneTweet, removeTweetUsingId } = tweetSlice.actions

export default tweetSlice.reducer

export const getAllTweetsInRedux = () => async (dispatch: any) => {
  try {
    const response = await getAllTweets()
    dispatch(setTweets(response.data?.data))
  } catch (error: any) {
    console.log("ERROR", error)
  }
}
