import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";

export const AddTweet = () => {

  const [text, setText] = useState('');

  const maxLength = 280;
  const remaining = maxLength - text.length;
  const percentage = ((maxLength - remaining) / maxLength) * 100;

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      
      <Card className="w-[50%]">

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex justify-between items-center gap-4 mb-2">
            <p>
              Make a tweet
            </p>
            <BsTwitterX size="1.5rem" />
          </CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="w-full flex flex-col items-end gap-2">

          <Textarea placeholder="What's happening?" className="border-0 p-0 md:text-base font-medium tracking-wide placeholder:tracking-normal resize-none focus-visible:ring-0 min-h-96" maxLength={280} onChange={handleChange} />

          <div className="w-full flex justify-end gap-4 items-center">
            <div className="tracker">
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
            </div>
            <Button className="w-40">
              Post
            </Button>
          </div>

        </CardContent>

      </Card>
      
    </div>
  )
}
