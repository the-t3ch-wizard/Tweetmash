import { getTwitterBasicDetails } from '@/services/twitter';
import { useEffect } from 'react';

export const TwitterBase = () => {

  useEffect(() => {
    // getTwitterBasicDetails();
  }, [])

  return (
    <div className='w-full h-full flex justify-center items-center'>
      TwitterBase
    </div>
  )
}
