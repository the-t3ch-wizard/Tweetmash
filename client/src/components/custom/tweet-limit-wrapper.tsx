import { useAppSelector } from "@/lib/store/hooks/hooks";
import { getRemainingTweets } from "@/services/user";
import { Clock, Sparkles } from "lucide-react";
import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const TweetLimitWrapper = ({ children, className }: {
  children: ReactNode;
  className?: string;
}) => {

  const planType = useAppSelector((state) => state.user.userDetails.planType)

  const [remainingPosts, setRemainingPosts] = useState(0);
  const [maxPosts, setMaxPosts] = useState(3);
  const [resetTime, setResetTime] = useState("12:00 AM");

  useEffect(() => {
    initializeRemainingTweetsState();
  }, [])

  const initializeRemainingTweetsState = async () => {
    try {
      const remainingTweets = await getRemainingTweets();
      if (remainingTweets.success){
        setRemainingPosts(remainingTweets?.data?.remaining);
        setMaxPosts(remainingTweets?.data?.limit);
        setResetTime(new Date(remainingTweets?.data?.resetTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }));
      }
    } catch (error: any) {
      console.log("ERROR", error)
      return toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
    }
  }

  return (
    <div className={`bg-muted rounded-xl ${className}`}>
      {
        planType === "free" ?
        <div className="w-full px-5 py-1.5 text-sm text-muted-foreground">
          {
            remainingPosts > 0 ?
            (<p>
              You have <span className="font-medium text-foreground">{remainingPosts}</span> free{" "}
              {remainingPosts === 1 ? "post" : "posts"} remaining today.
            </p>)
            :
            (<p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              You've used all {maxPosts} tweets! Try again after {resetTime} or{" "}
              <Link  to="/contact-us" state={{
                subject: "premium"
              }} className="font-medium text-primary hover:underline" onClick={() => {
                toast.success(
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Tell us about your premium needs!</span>
                    </div>
                    <div className="pl-6 text-sm">
                      <ul className="list-disc space-y-1">
                        <li>Which premium features you need most</li>
                        <li>How many accounts you want to manage</li>
                        <li>Any special requirements for your workflow</li>
                      </ul>
                    </div>
                  </div>,
                  {
                    duration: 10000, // Extra long duration for reading time
                  }
                )
              }}>
                upgrade now
              </Link>
            </p>)
          }
        </div> :
        null
      }
      {children}
    </div>
  );
}
