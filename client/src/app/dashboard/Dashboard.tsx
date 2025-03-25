import { Tweet } from '@/components/custom/tweet';
import { getAllTweetsInRedux } from '@/lib/store/features/tweet/tweetSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarClock, DollarSign } from 'lucide-react';
import { BsTwitterX } from "react-icons/bs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MdDoneAll } from 'react-icons/md';
import { getAllPendingTweetsCountByMonth, getAllPostedTweetsCountByMonth, getAllTweetsCountByMonth, getAllTweetsDataByMonth } from '@/services/twitter';

export const Dashboard = () => {

  const dispatch = useAppDispatch();
    
  useEffect(() => {
    fetchInitialData();
  }, [])

  const tweets = useAppSelector((state) => state.tweet.tweets)

  const [activeChart, setActiveChart] = useState("total")
  const [chartData, setChartData] = useState([]);
  const [totalTweets, setTotalTweets] = useState(0);
  const [postedTweets, setPostedTweets] = useState(0);
  const [scheduledTweets, setScheduledTweets] = useState(0);

  const [prevTotalTweets, setPrevTotalTweets] = useState(0);
  const [prevPostedTweets, setPrevPostedTweets] = useState(0);
  const [prevScheduledTweets, setPrevScheduledTweets] = useState(0);

  const fetchInitialData = async () => {
    dispatch(getAllTweetsInRedux());

    const currentMonth = new Date().getMonth();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Fetch current month data
    const totalCurr = await getAllTweetsCountByMonth(currentMonth);
    const postedCurr = await getAllPostedTweetsCountByMonth(currentMonth);
    const scheduledCurr = await getAllPendingTweetsCountByMonth(currentMonth);

    // Fetch previous month data
    const totalPrev = await getAllTweetsCountByMonth(lastMonth.getMonth());
    const postedPrev = await getAllPostedTweetsCountByMonth(lastMonth.getMonth());
    const scheduledPrev = await getAllPendingTweetsCountByMonth(lastMonth.getMonth());

    // Update states
    setTotalTweets(totalCurr.data.data);
    setPostedTweets(postedCurr.data.data);
    setScheduledTweets(scheduledCurr.data.data);

    setPrevTotalTweets(totalPrev.data.data);
    setPrevPostedTweets(postedPrev.data.data);
    setPrevScheduledTweets(scheduledPrev.data.data);

    // Fetch tweet data for chart
    const tweetsData = await getAllTweetsDataByMonth(currentMonth);
    setChartData(tweetsData.data.data);
  };

  // Calculate Progress Percentages
  const calcProgress = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0; // If no data in prev month, show 100% increase if any data exists
    return (((curr - prev) / prev) * 100).toFixed(1);
  };

  const chartConfig = {
    views: {
      label: "No. of tweets",
    },
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
    posted: {
      label: "Posted",
      color: "hsl(var(--chart-2))",
    },
    scheduled: {
      label: "Scheduled",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full flex flex-col gap-4 justify-start items-center p-4">

      <div className='w-full flex justify-between items-center'>
        <Tabs defaultValue="tweets" className="w-full">
          <TabsList className="w-96 flex justify-center items-center">
            <TabsTrigger value="tweets" className="w-full">Tweets</TabsTrigger>
            <TabsTrigger value="analytics" className="w-full">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="tweets" className="w-full py-2 flex flex-col gap-4 justify-start items-start">
            {
              tweets.map((tweet: {
                _id: string | undefined;
                tweetId: string | undefined;
                content: string | undefined;
                status: string | undefined,
                scheduledTime: Date | string | undefined,
                createdAt: string | undefined;
              }) => (
                <Tweet key={tweet._id} id={tweet._id || ""} tweetId={tweet.tweetId || ""} content={tweet.content || ""} createdAt={tweet.createdAt || ""} status={tweet.status || ""} scheduledTime={tweet.scheduledTime || ""} />
              ))
            }
          </TabsContent>

          <TabsContent value="analytics">

            <div className="flex justify-start items-center gap-3 flex-wrap">

              {/* Total Tweets Card */}
              <Card className="w-72">
                <CardHeader className="w-full p-5 pb-4">
                  <CardTitle className="w-full flex justify-between items-center">
                    <p>Total Tweets</p>
                    <BsTwitterX className="text-muted-foreground" size="1rem" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-1">
                  <div className="text-2xl font-bold">{totalTweets}</div>
                  <div className={`text-sm ${Number(calcProgress(totalTweets, prevTotalTweets)) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Number(calcProgress(totalTweets, prevTotalTweets)) >= 0 ? '↑' : '↓'} {Number(calcProgress(totalTweets, prevTotalTweets))}% from last month
                  </div>
                </CardContent>
              </Card>
              {/* Posted Tweets Card */}
              <Card className="w-72">
                <CardHeader className="w-full p-5 pb-4">
                  <CardTitle className="w-full flex justify-between items-center">
                    <p>Posted Tweets</p>
                    <MdDoneAll className="text-muted-foreground" size="1.2rem" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-1">
                  <div className="text-2xl font-bold">{postedTweets}</div>
                  <div className={`text-sm ${Number(calcProgress(postedTweets, prevPostedTweets)) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Number(calcProgress(postedTweets, prevPostedTweets)) >= 0 ? '↑' : '↓'} {calcProgress(postedTweets, prevPostedTweets)}% from last month
                  </div>
                </CardContent>
              </Card>
              {/* Scheduled Tweets Card */}
              <Card className="w-72">
                <CardHeader className="w-full p-5 pb-4">
                  <CardTitle className="w-full flex justify-between items-center">
                    <p>Scheduled Tweets</p>
                    <CalendarClock className="text-muted-foreground" size="1.2rem" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex flex-col gap-1">
                  <div className="text-2xl font-bold">{scheduledTweets}</div>
                  <div className={`text-sm ${Number(calcProgress(scheduledTweets, prevScheduledTweets)) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Number(calcProgress(scheduledTweets, prevScheduledTweets)) >= 0 ? '↑' : '↓'} {Number(calcProgress(scheduledTweets, prevScheduledTweets))}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader className="w-full border-b p-0">
                  <div className="w-full flex justify-between items-center">
                    <div className="p-4 pb-3 flex flex-col gap-1">
                      <CardTitle>
                        Number of tweets of {new Date().toLocaleString("en-US", { month: "long" })}
                      </CardTitle>
                    </div>
                    <div className="p-4 pb-3">
                      <Select onValueChange={(e) => {
                        setActiveChart(e)
                      }} defaultValue="total">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="total">Total</SelectItem>
                            <SelectItem value="posted">Posted</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          }}
                        />
                      }
                    />
                    <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                  </BarChart>
                </ChartContainer>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
    </div>
  )
}
