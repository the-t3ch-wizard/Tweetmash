import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RiTwitterXLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { initializeTwitterAuthorization } from "@/services/twitter";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { setConnectionStage, setOauthToken } from "@/lib/store/features/connectTwitter/connectTwitterSlice";

export const ConnectTwitterStep1 = () => {

  const dispatch = useAppDispatch();

  const connectTwitterHandler = async () => {
    try {
      const data = await initializeTwitterAuthorization()

      window.open(`https://api.twitter.com/oauth/authenticate?oauth_token=${data.data?.data?.oauth_token}`, "_blank");

      dispatch(setConnectionStage(2))
      dispatch(setOauthToken(data.data?.data?.oauth_token))
      
    } catch (error: any) {
      console.log("Error",error)
      toast.error(error?.response?.data?.message || "Unable to initialize twitter authorization")
    }
  }

  return (
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
        <Button className="w-full" onClick={connectTwitterHandler}>
          <RiTwitterXLine size="3rem" />
          <p>
            Connect Twitter
          </p>
        </Button>
      </CardFooter>

    </Card>
  )
}
