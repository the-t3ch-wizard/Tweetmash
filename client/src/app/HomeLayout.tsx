import { AppNavbar } from "@/components/custom/app-navbar"
import { ThemeProvider } from "@/components/custom/theme-provider"
import { Toaster } from "@/components/ui/sonner"
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
        dispatch(setUserLoggedInStatus(true))
        dispatch(setUserDetails(response.data))
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
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
