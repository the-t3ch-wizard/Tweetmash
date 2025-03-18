import { Button } from "@/components/ui/button"
import { authorizeTwitter } from "@/services/twitter";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const AuthTwitterCallback = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
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

      const data = authorizeTwitter(code);

    }
  }, [])
  
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center p-4'>

      <Button onClick={() => {
        // handleOauth();
      }}>
        Auth Twitter Callback
      </Button>
      
    </div>
  )
}
