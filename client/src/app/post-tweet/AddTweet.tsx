import { TweetLimitWrapper } from "@/components/custom/tweet-limit-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { addOneTweet } from "@/lib/store/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { postTweet } from "@/services/twitter";
import { useState } from "react";
import { BsGlobeCentralSouthAsia, BsTwitterX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AddTweet = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const twitterConnected = useAppSelector((state) => state.user.userDetails.twitterConnected)

  const [text, setText] = useState("");

  const maxLength = 280;
  const remaining = maxLength - text.length;
  const percentage = ((maxLength - remaining) / maxLength) * 100;

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handlePostTweet = async () => {
    try {
      const response = await postTweet(text);
      setText("");
      dispatch(addOneTweet(response.data?.data));
      toast.success(response.data?.message || "Tweet posted successfully")
      navigate("/dashboard")
    } catch (error: any) {
      console.log("ERROR", error)
      toast.error(error?.response?.data?.message || error?.message || "Unable to post tweet")
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center py-6'>
      
      <TweetLimitWrapper className="lg:w-[80%] md:w-[80%] w-[95%] flex flex-col justify-center items-center">
        <Card className="w-full">

          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex justify-between items-center gap-4 mb-2">
              <p>
                Make a tweet
              </p>
              <BsTwitterX size="1.5rem" />
            </CardTitle>
            <Progress value={percentage} className={`w-full h-[2px]`} />
          </CardHeader>

          <CardContent className="w-full flex flex-col items-end gap-2">

            <Textarea placeholder="What's happening?" value={text} className="border-0 p-0 md:text-base font-medium tracking-wide placeholder:tracking-normal resize-none focus-visible:ring-0 min-h-96" maxLength={280} onChange={handleChange} />

            <div className="w-full flex justify-between gap-4 items-end">
              <div className="">
                <Badge variant="outline" className="flex items-center gap-2 p-2 px-4 rounded-2xl hover:bg-accent/30 cursor-default">
                  <BsGlobeCentralSouthAsia />
                  Everyone can reply
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* <div className="tracker">
                  <svg className="h-10 w-10" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke={percentage >= 100 ? 'red' : percentage >= 80 ? 'orange' : 'green'}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(percentage / 100) * 125.6}, 125.6`}
                    />
                    {
                      remaining <= 20 && (
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white">
                          {remaining}
                        </text>
                      )
                    }
                  </svg>
                </div> */}
                <Button className="w-40" disabled={!twitterConnected} onClick={handlePostTweet}>
                  Post
                </Button>
              </div>
            </div>

          </CardContent>

        </Card>
      </TweetLimitWrapper>
      
    </div>
  )
}
