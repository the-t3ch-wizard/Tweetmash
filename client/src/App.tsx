import { Outlet, Route, Routes } from 'react-router-dom'
import { HomeLayout } from './app/HomeLayout'
import { Home } from './app/Home'
import { AboutUs } from './app/about-us/AboutUs'
import { ContactUs } from './app/contact-us/ContactUs'
import { useAppSelector } from './lib/store/hooks/hooks'
import { NotFound } from './app/404-not-found/NotFound'
import { ConnectTwitter } from './app/connect/twitter/ConnectTwitter'
import { Dashboard } from './app/dashboard/Dashboard'
import { AddTweet } from './app/post-tweet/AddTweet'
import { SchedulePost } from './app/schedule-tweet/SchedulePost'
import { Profile } from './app/profile/Profile'

function App() {

  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus)

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} >
        <Route path="" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        {
          loggedInStatus ?
          <>
            <Route path="connect" element={<Outlet />}>
              <Route path="twitter" element={<ConnectTwitter />} />
            </Route>
            
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post-tweet" element={<AddTweet />} />
            <Route path="schedule-tweet" element={<SchedulePost />} />

            <Route path="profile" element={<Profile />} />
          </> :
          null
        }
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
