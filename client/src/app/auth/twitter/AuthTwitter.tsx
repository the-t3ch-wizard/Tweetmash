import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { env } from "@/config/env";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const AuthTwitter = () => {

  const url = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${env.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.TWITTER_AUTH_REDIRECT_URI)}&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`
  
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center p-4'>

      <Card className="w-96 flex flex-col gap-2">

        <CardHeader>
          <div className="w-full h-32 flex justify-center items-center">
            <RiTwitterXLine size="3rem" />
          </div>
          <CardTitle className="text-xl">Connect Your Twitter Account</CardTitle>
          <CardDescription>To continue, please connect your Twitter account to enable all features.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-7">

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                Read
              </p>
              <p className="text-sm text-muted-foreground">
                Read Posts and profile information
              </p>
            </div>
            <Switch checked disabled className="disabled:opacity-100" />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                Read and write
              </p>
              <p className="text-sm text-muted-foreground">
                Read and Post Posts and profile information
              </p>
            </div>
            <Switch checked disabled className="disabled:opacity-100" />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                Read and write Direct message
              </p>
              <p className="text-sm text-muted-foreground">
                Read Posts and profile information, read and post Direct messages
              </p>
            </div>
            <Switch checked={false} disabled className="disabled:opacity-100" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button className="w-full">
            <Link to={url} target="_blank" className="flex gap-2 justify-center items-center">
              <RiTwitterXLine size="3rem" />
              <p>
                Connect Twitter
              </p>
            </Link>
          </Button>
        </CardFooter>

      </Card>
      
    </div>
  )
}
