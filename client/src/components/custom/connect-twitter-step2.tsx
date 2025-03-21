import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiTwitterXLine } from "react-icons/ri";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { toast } from "sonner";
import { connectTwitter } from "@/services/twitter";
import { setConnectionStage } from "@/lib/store/features/connectTwitter/connectTwitterSlice";

export const ConnectTwitterStep2 = () => {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const oauth_token = useAppSelector(state => state.connectTwitter.oauth_token)

  const completeConnectingTwitterHandler = async () => {
    try {
      if (value.length != 7){
        toast.error("PIN is invalid")
        return;
      }
      if (oauth_token.length < 1){
        toast.error("Oauth token is missing")
        return;
      }
      const data = await connectTwitter(oauth_token, value)
      console.log("DATA", data)
      
      dispatch(setConnectionStage(3))
    } catch (error: any) {
      console.log("ERROR", error)
      dispatch(setConnectionStage(4))
    }
  }

  return (
    <Card className="w-96 flex flex-col gap-2">

      <CardHeader>
        <div className="w-full h-32 flex justify-center items-center">
          <RiTwitterXLine size="3rem" />
        </div>
        <CardTitle className="text-xl">Enter Authorization PIN</CardTitle>
        <CardDescription>To complete the authorization process, Enter the PIN you got from the twitter page</CardDescription>
      </CardHeader>

      <CardContent>

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <InputOTP
            maxLength={7}
            value={value}
            onChange={(value) => setValue(value)}
            className="w-full"
          >
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={0} className="text-xl" />
              <InputOTPSlot index={1} className="text-xl" />
              <InputOTPSlot index={2} className="text-xl" />
              <InputOTPSlot index={3} className="text-xl" />
              <InputOTPSlot index={4} className="text-xl" />
              <InputOTPSlot index={5} className="text-xl" />
              <InputOTPSlot index={6} className="text-xl" />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            Enter your one-time password.
          </div>
        </div>

      </CardContent>

      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={completeConnectingTwitterHandler}>
          <RiTwitterXLine size="3rem" />
          <p>
            Proceed
          </p>
        </Button>
      </CardFooter>
      
    </Card>
  )
}
