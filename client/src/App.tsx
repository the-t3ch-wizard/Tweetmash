import { Outlet, Route, Routes } from 'react-router-dom'
import { HomeLayout } from './app/HomeLayout'
import { Home } from './app/Home'
import { AboutUs } from './app/about-us/AboutUs'
import { ContactUs } from './app/contact-us/ContactUs'
import { useAppSelector } from './lib/store/hooks/hooks'
import { NotFound } from './app/404-not-found/NotFound'
import { AuthTwitter } from './app/auth/twitter/AuthTwitter'
import { AuthTwitterCallback } from './app/auth/twitter/callback/AuthTwitterCallback'

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
            <Route path="auth" element={<Outlet />}>
              <Route path="twitter" element={<AuthTwitter />} />
              <Route path="twitter/callback" element={<AuthTwitterCallback />} />
            </Route>
          </> :
          null
        }
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
