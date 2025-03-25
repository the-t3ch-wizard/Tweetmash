import { Tweet } from "@/components/custom/tweet";
import { getAllTweetsInRedux } from "@/lib/store/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect } from "react";

export const Home = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAllTweetsInRedux())
  }, [])

  const tweets = useAppSelector((state) => state.tweet.tweets)
  
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-center p-4">

      HOME
      
    </div>
  )
}
