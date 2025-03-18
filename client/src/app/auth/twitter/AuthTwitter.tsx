import { Button } from "@/components/ui/button"
import { env } from "@/config/env";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const AuthTwitter = () => {

  const url = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${env.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.TWITTER_AUTH_REDIRECT_URI)}&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`
  
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center p-4'>

      <Button>
        <Link to={url} target="_blank">
          Auth Twitter
        </Link>
      </Button>
      
    </div>
  )
}
