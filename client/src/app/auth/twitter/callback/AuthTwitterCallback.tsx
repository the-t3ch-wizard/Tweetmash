import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authorizeTwitter } from "@/services/twitter";
import { useEffect, useState } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export const AuthTwitterCallback = () => {

  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isCallbackCodeValid, setIsCallbackCodeValid] = useState(false);

  const authorizeTwitterCallbackCode = async () => {
    if (searchParams.get("state") === "state"){
      const code = searchParams.get("code");

      if (!code) {
        toast.error("Code is invalid!");
        return;
      }

      // set loading to true 
      // and automatically do initial loading as skeleton along with proper test message for user engagement

      // send code to database
      // and based on that get access token 
      // which will be used inorder to create crud of twitter post

      try {
        const data = await authorizeTwitter(code);
        setIsCallbackCodeValid(true);
        toast.success("Authorized successfully!");
      } catch (error) {
        console.log("Error", error);
        setIsCallbackCodeValid(false);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false)
      }

    } else {
      toast.info("Make sure to connect with twitter!");
      navigate("/auth/twitter")
    }
  }

  useEffect(() => {
    authorizeTwitterCallbackCode();
  }, [])
  
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center p-4'>

      {
        isLoading ?
        <Card className="w-96 flex flex-col gap-2">

          <CardHeader>
            <Skeleton className="w-full h-32 flex justify-center items-center opacity-25">
              <RiTwitterXLine size="3rem" />
            </Skeleton>

            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Skeleton className="w-full h-10" />
          </CardFooter>

        </Card> :
        isCallbackCodeValid ?
        <Card className="w-96 flex flex-col gap-2">

          <CardHeader>
            <div className="w-full h-32 flex justify-center items-center">
              <div className="w-[4rem] h-[4rem] border rounded-full flex justify-center items-center bg-green-500">
                <MdDone size="3rem" />
              </div>
            </div>
            <CardTitle className="text-xl">Connected your Twitter Account Successfully!</CardTitle>
            <CardDescription>Please go to dashboard, inorder to explore more.</CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Button className="w-full">
              <Link to={"/dashboard"} className="flex gap-2 justify-center items-center">
                <ArrowRight />
                <p>
                  Go to Dashboard
                </p>
              </Link>
            </Button>
          </CardFooter>
          
        </Card> :
        <Card className="w-96 flex flex-col gap-2">

          <CardHeader>
            <div className="w-full h-32 flex justify-center items-center">
              <div className="w-[4rem] h-[4rem] border rounded-full flex justify-center items-center bg-destructive">
                <RxCross2 size="3rem" />
              </div>
            </div>
            <CardTitle className="text-xl">Unable to connected your Twitter Account!</CardTitle>
            <CardDescription>Please connect your Twitter account to enable all features.</CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Button className="w-full p-0">
              <Link to={"/auth/twitter"} className="w-full h-full flex gap-2 justify-center items-center">
                <ArrowRight />
                <p>
                  Try connecting again!
                </p>
              </Link>
            </Button>
          </CardFooter>
          
        </Card>
      }
      
    </div>
  )
}
