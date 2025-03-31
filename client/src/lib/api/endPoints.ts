
const API_ENDPOINTS = {

  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    WHO_AM_I: "/auth/who-am-i",
  },

  USER: {
    BASE: "/user",
    REMAINING_TWEETS: () => `${API_ENDPOINTS.USER.BASE}/remaining-tweets`,
  },

  CONTACT: {
    BASE: "/contact",
  },

  AUTHORIZE_TWITTER: "/auth/twitter",
  INITIALIZE_TWITTER_AUTHORIZATION: "/auth/init/twitter",
  CONNECT_TWITTER: "/auth/connect/twitter",
  DISCONNECT_TWITTER: "/auth/disconnect/twitter",

  TWITTER_TWEET: "/twitter/tweet",
  GET_ALL_TWEETS: "/twitter/tweets",
  SCHEDULE_TWEET: "/twitter/schedule-tweet",
  COUNT_TWEETS_BY_MONTH: "/twitter/count-tweets",
  COUNT_POSTED_TWEETS_BY_MONTH: "/twitter/count-posted-tweets",
  COUNT_PENDING_TWEETS_BY_MONTH: "/twitter/count-pending-tweets",
  TWEETS_DATA_BY_MONTH: "/twitter/count-tweets-data",

  BASIC_TWITTER_DETAILS: "/twitter/basic-details",
};

export default API_ENDPOINTS;
