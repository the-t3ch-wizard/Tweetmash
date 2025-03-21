import { getTwitterBasicDetails } from '@/services/twitter';
import { useEffect } from 'react';

export const Dashboard = () => {

  useEffect(() => {
    // getTwitterBasicDetails();
  }, [])

  return (
    <div className='w-full flex justify-center items-center'>
      TwitterBase / Dashboard
    </div>
  )
}
