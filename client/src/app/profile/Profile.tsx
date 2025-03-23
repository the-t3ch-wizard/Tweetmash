import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { clearTwitterDetails } from "@/lib/store/features/user/userSlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks"
import { disconnectTwitter } from "@/services/twitter"
import { ChevronRight } from "lucide-react"
import { BsTwitterX } from "react-icons/bs"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export const Profile = () => {

  const dispatch = useAppDispatch()

  const userDetails = useAppSelector(state => state.user.userDetails)

  const disconnectTwitterHandler = async () => {
    try {
      const data = await disconnectTwitter();
      dispatch(clearTwitterDetails())
      toast.success("Twitter account disconnected successfully")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Unable to disconnect twitter account")
    }
  }

  return (
    <div className='w-full flex justify-center items-center'>
      
      <Card className="lg:w-[80%] md:w-[80%] w-[95%] m-6">

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex justify-between items-center gap-4 mb-2">
            <p>
              My Profile
            </p>
            <BsTwitterX size="1.5rem" />
          </CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="w-full flex flex-col items-start gap-2">

          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="profile picture" />
                <AvatarFallback>
                  {userDetails.name ? userDetails.name[0] : ""}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium text-lg capitalize">
                  {userDetails.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userDetails.email}
                </p>
              </div>
            </div>

            <div>
              <Button variant="outline" className="flex items-center rounded-full">
                <Link to="/edit-profile" className="flex items-center">
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex flex-col justify-start items-start gap-4 pt-8">
              <p className="text-lg font-medium">
                Social Accounts
                <Separator />
              </p>

              <div className="w-[40%] flex justify-start items-center gap-32">

                <div className="flex justify-center items-center gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="p-2 rounded-md border">
                      <BsTwitterX size="1.2rem" />
                    </div>
                    <p>
                      Twitter
                    </p>
                  </div>
                  <ChevronRight size="1.2rem" />
                  {
                    userDetails.twitterConnected ?
                    <Badge variant="outline" className="rounded-full p-1 px-3">
                      @{userDetails.twitterUsername}
                    </Badge> :
                    null
                  }
                </div>

                  {
                    userDetails.twitterConnected ?
                    <Button variant="destructive" className="flex items-center rounded-full" onClick={disconnectTwitterHandler}>
                      Disconnect
                    </Button> :
                    <Button variant="outline" className="flex items-center rounded-full">
                      <Link to="/connect/twitter" className="flex items-center">
                        Connect
                      </Link>
                    </Button>
                  }
              </div>
            </div>
          </div>

        </CardContent>


      </Card>
      
    </div>
  )
}
