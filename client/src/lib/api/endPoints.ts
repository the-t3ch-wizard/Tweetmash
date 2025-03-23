
const API_ENDPOINTS = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  WHO_AM_I: "/auth/who-am-i",

  AUTHORIZE_TWITTER: "/auth/twitter",
  INITIALIZE_TWITTER_AUTHORIZATION: "/auth/init/twitter",
  CONNECT_TWITTER: "/auth/connect/twitter",
  DISCONNECT_TWITTER: "/auth/disconnect/twitter",

  TWITTER_TWEET: "/twitter/tweet",
  GET_ALL_TWEETS: "/twitter/tweets",
  SCHEDULE_TWEET: "/twitter/schedule-tweet",

  BASIC_TWITTER_DETAILS: "/twitter/basic-details",
};

export default API_ENDPOINTS;
