import { BsTwitterX } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { getFormattedPostDate } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CalendarClock, Ellipsis, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteTweet } from "@/services/twitter";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { getAllTweetsInRedux, removeTweetUsingId } from "@/lib/store/features/tweet/tweetSlice";

export const Tweet = ({ id, tweetId, content, status, scheduledTime, createdAt }: {
  id: string;
  tweetId: string;
  content: string;
  status: string;
  scheduledTime: Date | string;
  createdAt: string;
}) => {

  const dispatch = useAppDispatch();

  const deleteTweetHandler = async () => {
    try {
      if (!tweetId) {
        if (!id) {
          toast.error("This tweet data is incomplete. Please refresh the page and try again.");
        } else {
          toast.error("This tweet hasn't been posted yet or needs refreshing.", {
            action: {
              label: 'Refresh',
              onClick: () => dispatch(getAllTweetsInRedux())
            }
          });
        }
        return;
      }
      const deletedTweet = await deleteTweet(tweetId, id);
      dispatch(removeTweetUsingId(id));
      toast.success(deletedTweet.data?.message || "Tweet deleted successfully")
    } catch (error: any) {
      console.log("ERROR", error)
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong")
    }
  }

  return (
    <Card className="w-full md:w-[70%]">

      <CardHeader className="p-4 px-6">
        <CardTitle className="text-sm flex justify-between items-center gap-4 mb-2">
          <div className="flex items-center gap-4">
            <BsTwitterX size="1rem" />
            {/* <p className="text-muted-foreground">
              Scheduled for: {getFormattedPostDate(scheduledTime)}
            </p> */}
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="text-muted-foreground flex justify-center items-center gap-2">
              {
                status === "pending" ?
                <>
                  <CalendarClock size={"1.2rem"} />
                  {getFormattedPostDate(scheduledTime)}
                </> : 
                status === "posted" ?
                "Posted "+getFormattedPostDate(scheduledTime) : null
              }
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none hover:bg-accent hover:bg-opacity-10 p-2 rounded-full">
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="w-full text-red-500 hover:bg-accent/20 hover:text-red-500" >
                      <Trash2 />
                      Delete 
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/80" onClick={deleteTweetHandler}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="w-full flex flex-col items-start gap-2 text-lg">

        {content}

      </CardContent>

    </Card>
  )
}
