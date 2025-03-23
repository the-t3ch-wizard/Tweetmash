import { SidebarTrigger } from '../ui/sidebar'
import { useState } from 'react';

export const AppNavbar = () => {

  const [validChatPathStatus, setValidChatPathStatus] = useState(false);

  return (
    <div className='w-full h-16 px-4 sticky bg-background top-0 z-50 flex justify-between items-center border-b-2 border-border'>

      <div className='md:hidden flex justify-center items-center'>
        <SidebarTrigger />
      </div>

    </div>
  )
}
