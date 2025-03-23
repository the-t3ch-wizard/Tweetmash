import { Tweet } from '@/components/custom/tweet';
import { getAllTweetsInRedux } from '@/lib/store/features/tweet/tweetSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect } from 'react';

export const Dashboard = () => {

  const dispatch = useAppDispatch();
    
    useEffect(() => {
      dispatch(getAllTweetsInRedux())
    }, [])
  
    const tweets = useAppSelector((state) => state.tweet.tweets)

  return (
    <div className="w-full flex flex-col gap-4 justify-start items-center p-6">
          
      {
        tweets.map((tweet: {
          _id: string | undefined;
          tweetId: string | undefined;
          content: string | undefined;
          status: string | undefined,
          scheduledTime: Date | string | undefined,
          createdAt: string | undefined;
        }) => (
          <Tweet key={tweet._id} id={tweet._id || ""} tweetId={tweet.tweetId || ""} content={tweet.content || ""} createdAt={tweet.createdAt || ""} status={tweet.status || ""} scheduledTime={tweet.scheduledTime || ""} />
        ))
      }
      
    </div>
  )
}
