import { AppNavbar } from "@/components/custom/app-navbar"
import { ThemeProvider } from "@/components/custom/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { setServerRunningStatus } from "@/lib/store/features/app/appSlice"
import { clearUserDetails, clearUserLoggedInStatus, setUserDetails, setUserLoggedInStatus } from "@/lib/store/features/user/userSlice"
import { useAppDispatch } from "@/lib/store/hooks/hooks"
import { whoAmiI } from "@/services/user"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const HomeLayout = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    whoAmiI()
    .then((response) => {
      if (response.success){
        dispatch(setServerRunningStatus(true))
        dispatch(setUserLoggedInStatus(true))
        dispatch(setUserDetails(response.data))
      }
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        console.log('⏱️ Request timed out - likely a cold start on Render');
      } else {
        dispatch(setServerRunningStatus(true))
        console.log('ERROR', error.message || error)
      }
      dispatch(clearUserLoggedInStatus())
      dispatch(clearUserDetails())
    })
  }, [dispatch])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      <AppNavbar />
      
      <Toaster
        richColors={true}
        closeButton={true}
      />
      
      <Outlet />

    </ThemeProvider>
  )
}
