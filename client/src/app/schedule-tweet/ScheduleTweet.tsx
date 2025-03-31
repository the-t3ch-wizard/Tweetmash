import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { addOneTweet } from "@/lib/store/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { postScheduleTweet, postTweet } from "@/services/twitter";
import { schedulePostSchema, schedulePostValues } from "@/validations/tweet/schedule-post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsGlobeCentralSouthAsia, BsTwitterX } from "react-icons/bs";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge";
import { TweetLimitWrapper } from "@/components/custom/tweet-limit-wrapper";
import { useNavigate } from "react-router-dom";

export const ScheduleTweet = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const twitterConnected = useAppSelector((state) => state.user.userDetails.twitterConnected)

  const form = useForm<schedulePostValues>({
    resolver: zodResolver(schedulePostSchema),
    defaultValues: {
      topic: "",
      includeHashtags: false,
      recurrence: "none",
      tone: "",
    },
  })

  const onSubmit = async (data: schedulePostValues) => {
    const currentDate = new Date();
    const scheduledDate = new Date(data.scheduledTime);
    if (scheduledDate <= currentDate) {
      toast.error("Scheduled time must be in the future");
      return;
    }
    try {
      const response = await postScheduleTweet(data);
      dispatch(addOneTweet(response.data.data));
      form.reset();
      toast.success(response.data?.message || "Tweet scheduled successfully");
      navigate("/dashboard")
    } catch (error: any) {
      console.log("ERROR", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to schedule tweet");
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center py-6'>

      <TweetLimitWrapper className="lg:w-[80%] md:w-[80%] w-[95%] flex flex-col justify-center items-center">
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex justify-between items-center gap-4 mb-2">
              <p>
                Schedule tweet
              </p>
              <BsTwitterX size="1.5rem" />
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="w-full flex flex-col items-end gap-2">

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Technology, Marketing, News" {...field} />
                      </FormControl>
                      <FormDescription>The main topic of your tweet.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Schedule Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? format(field.value, "PPP p") : <span>Pick a date and time</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          <div className="p-3 border-t border-border">
                            <Input
                              type="time"
                              onChange={(e) => {
                                const date = field.value || new Date()
                                const [hours, minutes] = e.target.value.split(":")
                                date.setHours(Number.parseInt(hours, 10))
                                date.setMinutes(Number.parseInt(minutes, 10))
                                field.onChange(date)
                              }}
                              defaultValue={
                                field.value
                                  ? `${field.value.getHours().toString().padStart(2, "0")}:${field.value.getMinutes().toString().padStart(2, "0")}`
                                  : "12:00"
                              }
                              className="bg-accent"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <div className="flex justify-start items-center gap-2">
                          <p>
                            When your tweet should be published.
                          </p>
                          <Button variant="outline" onClick={(e) => {
                            e.preventDefault();
                            const date = new Date()
                            date.setTime(date.getTime() + 2 * 60 * 1000)
                            field.onChange(date)
                          }} className="text-foreground rounded-2xl" size="sm">
                            <Clock />
                            After 2 minutes
                          </Button>
                          <Button variant="outline" onClick={(e) => {
                            e.preventDefault();
                            const date = new Date()
                            date.setTime(date.getTime() + 5 * 60 * 1000)
                            field.onChange(date)
                          }} className="text-foreground rounded-2xl" size="sm">
                            <Clock />
                            After 5 minutes
                          </Button>
                        </div>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includeHashtags"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Hashtags</FormLabel>
                        <FormDescription>Automatically add relevant hashtags to your tweet.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recurrence"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Recurrence</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal">None</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="daily" />
                            </FormControl>
                            <FormLabel className="font-normal">Daily</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="weekly" />
                            </FormControl>
                            <FormLabel className="font-normal">Weekly</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>How often this tweet should be posted.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tweetLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tweet Length</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The preferred length of your tweet.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Professional, Casual, Humorous" {...field} />
                      </FormControl>
                      <FormDescription>The tone of voice for your tweet.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <Badge variant="outline" className="flex items-center gap-2 p-2 px-4 rounded-2xl hover:bg-accent/30 cursor-default">
                      <BsGlobeCentralSouthAsia />
                      Everyone can reply
                    </Badge>
                  </div>
                  <Button type="submit" disabled={!twitterConnected}>
                    Schedule Tweet
                  </Button>
                </div>
              </form>
            </Form>

          </CardContent>
        </Card>
      </TweetLimitWrapper>
      
    </div>
  )
}
