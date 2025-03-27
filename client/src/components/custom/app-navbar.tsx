import { Logo } from './logo';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from "@/components/custom/mode-toggle"
import { AppLogin } from "./app-login"
import { AppSignup } from "./app-signup"
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { logout } from '@/services/user';
import { Button } from '../ui/button';
import { HiUserCircle } from 'react-icons/hi2';
import { BadgePlus, CalendarClock, Home, Info, LayoutDashboard, LogOut, MessageSquareWarning } from 'lucide-react';
import { useEffect, useState } from 'react';

export const AppNavbar = () => {

  const navigate = useNavigate();
  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus);

  const [menuItems, setMenuItems] = useState([
    {
      title: "Features",
      url: "/#features",
      icon: null,
    },
    {
      title: "Pricing",
      url: "/#pricing",
      icon: null,
    },
    // {
    //   title: "Testimonials",
    //   url: "/#testimonials",
    //   icon: null,
    // },
    // {
    //   title: "About us",
    //   url: "/about-us",
    //   icon: null,
    // },
    {
      title: "Contact us",
      url: "/contact-us",
      icon: null,
    },
    {
      title: "FAQ",
      url: "/#faq",
      icon: null,
    }
  ]);

  useEffect(() => {
    if (loggedInStatus){
      setupSidebarMenuItems();
    }
  }, [loggedInStatus])

  const setupSidebarMenuItems = async () => {
    setMenuItems([
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: null,
      },
      {
        title: "Post Tweet",
        url: "/post-tweet",
        icon: null,
      },
      {
        title: "Schedule Tweet",
        url: "/schedule-tweet",
        icon: null,
      },
    ])
  }

  const profileMenuItems = [
    {
      title: "Contact us",
      url: "/contact-us",
      icon: MessageSquareWarning,
    },
    // {
    //   title: "About us",
    //   url: "/about-us",
    //   icon: Info,
    // },
  ]

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.success){
        navigate("/")
        window.location.reload();
      }
    } catch (error: any) {
      console.log('error', error)
      toast.error(error?.response?.data?.message || error?.message || 'Logout failed')
    }
  }

  return (
    <div className='w-full h-16 px-4 sticky bg-background top-0 z-50 flex justify-between items-center border-b-2 border-border'>

      <div className='flex justify-center items-center'>
        
        <Link to="/">
          <Logo />
        </Link>
        
      </div>

      <div className='flex justify-center items-center'>
        
        <nav className="hidden gap-6 md:flex">
          {
            menuItems.map((item, idx) => {
              return (<Link
                to={item.url}
                className="flex items-center text-base font-medium text-muted-foreground transition-all hover:text-foreground skew-x-2 hover:skew-x-0"
              >
                {/* {item.icon != null ? <item.icon /> : null} */}
                {item.title}
              </Link>)
            })
          }
        </nav>
        
      </div>

      <div className="flex justify-center items-center">
        {
          loggedInStatus ?
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button variant='outline' className='flex justify-start items-center gap-3'>
                <HiUserCircle className='text-xl' />
                <p>
                  My Profile
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
                <DropdownMenuItem>
                <Link to={`/profile`} className="w-full flex gap-2 justify-start items-center">
                  <HiUserCircle className=" w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {
                profileMenuItems.map((profileMenu) => {
                  return <DropdownMenuItem className="flex justify-center items-center">
                    <Link to={profileMenu.url} className="w-full flex gap-2 justify-start items-center">
                      <profileMenu.icon className=" w-4" />
                      <span>{profileMenu.title}</span>
                    </Link>
                  </DropdownMenuItem>
                })
              }
              <DropdownMenuItem className='cursor-pointer' onClick={logoutHandler}>
                <LogOut className="w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> :
          <nav className="flex gap-2 items-center">
            <ModeToggle />
            <AppLogin />
            <AppSignup />
          </nav>
        }
      </div>

    </div>
  )
}
