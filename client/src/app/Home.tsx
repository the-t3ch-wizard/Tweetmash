import { getAllTweetsInRedux } from "@/lib/store/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Clock, Hash, Lock, MessageSquare, Sparkles, Twitter } from "lucide-react"
import { Link } from "react-router-dom";
import { AppSignup } from "@/components/custom/app-signup";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/custom/logo";
import { BsTwitterX } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { toast } from "sonner";

export const Home = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAllTweetsInRedux())
  }, [])

  const [videoPlayStatus, setVideoPlayStatus] = useState(false);
  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus);
  
  return (
    <div className="w-full h-[100rem] flex flex-col gap-4 justify-start items-center">

      <main className="w-full flex flex-col">

        <section className="w-full flex flex-col items-center pt-40 gap-8">

          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              Schedule Smarter Tweets with AI in Seconds!
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Let AI craft & schedule tweets for you — just pick a topic, tone, and time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {
                loggedInStatus ?
                <Link to="/schedule-tweet">
                  <Button size="lg" variant="outline" className="flex px-7 gap-2 justify-center items-center bg-[#1DA1F2] hover:bg-[#1a91da] text-white">
                    <>
                      <p>
                        Get Started
                      </p>
                      <ArrowRight />
                    </>
                  </Button>
                </Link> :
                <AppSignup title={
                  <>
                    <p>
                      Get Started
                    </p>
                    <ArrowRight />
                  </>
                } className="flex px-7 gap-2 justify-center items-center bg-[#1DA1F2] hover:bg-[#1a91da] text-white" />
              }
              <Link to="#features">
                <Button size="lg" variant="outline">
                  View Features
                </Button>
              </Link>
            </div>
          </div>

          {/* Tweet Preview */}
          <div className="mx-auto mt-12 max-w-[42rem] rounded-xl border bg-card p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white">
                <span className="font-bold">T</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Tweetmash User</span>
                  <span className="text-muted-foreground">@tweetmash_user</span>
                </div>
                <p className="mt-1">
                  Just tried #Tweetmash and my Twitter game is now on autopilot! 🤖🔥 No more writer's block. Just pure
                  engagement.
                </p>
                <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>24</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-repeat"
                    >
                      <path d="m17 2 4 4-4 4" />
                      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                      <path d="m7 22-4-4 4-4" />
                      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                    </svg>
                    <span>42</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span>128</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Animation */}
          <div className="mt-12 mb-16 w-[58rem] overflow-hidden rounded-xl border bg-card shadow-lg">
            <div className="aspect-video relative bg-muted flex items-center justify-center cursor-pointer" onClick={() => {
              setVideoPlayStatus(true)
            }}>
              <div className="w-full h-full flex flex-col items-center gap-4">
                {
                  videoPlayStatus ?
                  null :
                  <div className="w-full h-full absolute flex flex-col items-center gap-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <img 
                      src="src\assets\Tweetmash.png"
                      alt="Tweetmash demo video preview image"
                      className="w-full h-full"
                      />
                    <div className="w-full h-full absolute bottom-0 left-0 flex flex-col justify-center items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-20 h-20 text-[#e2c1ff]"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      <span className="text-xl">Watch Tweetmash in action</span>
                    </div>
                  </div>
                }
                <div className="w-full h-full">
                  {
                    videoPlayStatus ?
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/iCfoBeypkew?si=OXXud3z5Ozp0gmxC" title="Tweetmash Demo YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="flex flex-col pt-32 pb-20 gap-8 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">Key Features</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Everything you need to automate your Twitter presence
            </p>
          </div>

          <div className="w-full px-6 flex gap-6 justify-center items-center mt-12">
            <Card className="min-h-60 w-72 flex flex-col justify-center items-start">
              <CardHeader className="w-full flex flex-row justify-start items-center gap-3 space-y-0">
                <Sparkles className="h-6 w-6 text-[#1DA1F2]" />
                <CardTitle>AI-Powered Tweets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Simply describe your topic and pick a tone (witty, professional, passionate) and let AI generate tweets. Perfect for when you're stuck or need fresh ideas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="min-h-60 w-72 flex flex-col justify-center items-start">
              <CardHeader className="w-full flex flex-row justify-start items-center gap-3 space-y-0">
                <Clock className="h-6 w-6 text-[#1DA1F2]" />
                <CardTitle>Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Post once, daily, or weekly - choose what works best for your content strategy. Set it and forget it - your content posts automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="min-h-60 w-72 flex flex-col justify-center items-start">
              <CardHeader className="w-full flex flex-row justify-start items-center gap-3 space-y-0">
                <Hash className="h-6 w-6 text-[#1DA1F2]" />
                <CardTitle>Customizable Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Need a viral tweet? Choose style and add trending hashtags with one click for maximum
                  engagement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="min-h-60 w-72 flex flex-col justify-center items-start">
              <CardHeader className="w-full flex flex-row justify-start items-center gap-3 space-y-0">
                <Lock className="h-6 w-6 text-[#1DA1F2]" />
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  No spam. No misuse. We follow Twitter's guidelines strictly. Your account, your control.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="flex flex-col py-36 gap-8">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">How It Works</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Three simple steps to automate your Twitter presence
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-3 md:max-w-[64rem] mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white">1</div>
              <h3 className="mt-4 text-xl font-bold">Connect Twitter</h3>
              <p className="mt-2 text-muted-foreground">Authorize twitter securely using Twitter's official OAuth.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white">2</div>
              <h3 className="mt-4 text-xl font-bold">Set Preferences</h3>
              <p className="mt-2 text-muted-foreground">Pick topic, tone, and schedule time/date for your tweet.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white">3</div>
              <h3 className="mt-4 text-xl font-bold">Let AI Tweet for You</h3>
              <p className="mt-2 text-muted-foreground">
                Sit back & watch engagement grow while AI handles your Twitter.
              </p>
            </div>
          </div>

          <div className="mx-auto flex max-w-[58rem] justify-center mt-12">
            {
              loggedInStatus ?
              <Link to="/schedule-tweet">
                <Button size="lg" variant="outline" className="flex px-7 gap-2 justify-center items-center bg-[#1DA1F2] hover:bg-[#1a91da] text-white">
                  <>
                    <p>
                      Get Started Now
                    </p>
                    <ArrowRight />
                  </>
                </Button>
              </Link> :
              <AppSignup title={
                <>
                  <p>
                    Get Started Now
                  </p>
                </>
              } className="flex px-7 gap-2 justify-center items-center bg-[#1DA1F2] hover:bg-[#1a91da] text-white" />
            }
          </div>
        </section>

        {/* <section id="testimonials" className="flex flex-col pb-16 gap-8">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              What Our Users Say
            </h2>
          </div>

          <div className="flex w-full justify-center items-center mt-12">
            <TestimonialCarousel />
          </div>
        </section> */}

        {/* Pricing Comparison */}
        <section id="pricing" className="flex flex-col py-24 gap-8 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">Choose Your Plan</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Start free or power up with Premium
            </p>
          </div>

          {/* TODO add hover faded/muted color over plan card */}
          <div className="mx-auto grid max-w-[64rem] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-12">
            {/* Free Plan */}
            <div className="relative flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="absolute -top-3 right-4 rounded-full bg-[#441df2] px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Free Plan</h3>
                  <p className="text-muted-foreground">Perfect for getting started</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">$0</div>
                  <div className="text-muted-foreground">Forever free</div>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>3 tweets per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>Daily, Weekly recurring tweets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>Basic AI tones (Funny, Serious)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>Basic Analytics stats</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>Auto-Add Topic Based Hashtags</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>1 Twitter account</span>
                </li>
              </ul>
              <div className="mt-20 w-full">
                {
                  loggedInStatus ?
                  <Link to="/schedule-tweet">
                    <Button variant="default" className="w-full">
                      Get Started Free
                    </Button>
                  </Link> :
                  <AppSignup title="Get Started Free" />
                }
              </div>
            </div>

            {/* Premium Plan */}
            <div className="relative flex flex-col rounded-lg border bg-card p-6 shadow-sm">
              <div className="absolute -top-3 right-4 rounded-full bg-[#1dddf2] px-3 py-1 text-xs font-semibold text-muted">
                Newly Added
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Premium Plan</h3>
                  <p className="text-muted-foreground">For professionals and teams</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">$9</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>100 tweets per day</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Daily, Weekly, Monthly</strong> recurring tweets
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Advanced AI tones</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Detailed Analytics</strong> with trends data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Auto-Add Trending</strong> + Topic Based Hashtags
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#1DA1F2] shrink-0 mt-0.5" />
                  <span>
                    <strong>Manage 5+ Twitter accounts</strong>
                  </span>
                </li>
              </ul>
              <div className="mt-20">
                <Link to="/contact-us" state={{
                  subject: "premium"
                }}>
                  <Button className="w-full font-medium" variant="secondary" onClick={() => {
                    toast.success(
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Tell us about your premium needs!</span>
                        </div>
                        <div className="pl-6 text-sm">
                          <ul className="list-disc space-y-1">
                            <li>Which premium features you need most</li>
                            <li>How many accounts you want to manage</li>
                            <li>Any special requirements for your workflow</li>
                          </ul>
                        </div>
                      </div>,
                      {
                        duration: 10000, // Extra long duration for reading time
                      }
                    )
                  }}>Upgrade to Premium</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="flex flex-col pt-40 pb-20 gap-8 items-center">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Everything you need to know about Tweetmash
            </p>
          </div>

          <div className="w-[65rem] mt-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="rounded-md hover:bg-accent/20 border-0 border-b">
                <AccordionTrigger className="px-4 w-full hover:no-underline border-b text-base">Is Tweetmash free?</AccordionTrigger>
                <AccordionContent className="px-4 w-full pt-3 bg-accent/30 text-base">
                  Yes! Basic scheduling is free. Premium plans unlock advanced AI tones & analytics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="rounded-md hover:bg-accent/20 border-0 border-b">
                <AccordionTrigger  className="px-4 w-full hover:no-underline border-b text-base">Can I edit AI-generated tweets?</AccordionTrigger>
                <AccordionContent className="px-4 w-full pt-3 bg-accent/30 text-base">
                  You can tweak any AI-generated tweet before scheduling it to make sure it perfectly matches your voice
                  and style.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="rounded-md hover:bg-accent/20 border-0 border-b">
                <AccordionTrigger  className="px-4 w-full hover:no-underline border-b text-base">Is my Twitter account safe?</AccordionTrigger>
                <AccordionContent className="px-4 w-full pt-3 bg-accent/30 text-base">
                  We use Twitter's official API — no password storage. We only request the permissions necessary to
                  post tweets on your behalf, and you can revoke access at any time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="rounded-md hover:bg-accent/20 border-0 border-b">
                <AccordionTrigger  className="px-4 w-full hover:no-underline border-b text-base">How many tweets can I schedule?</AccordionTrigger>
                <AccordionContent className="px-4 w-full pt-3 bg-accent/30 text-base">
                  Free accounts can schedule up to 3 tweets per day. Premium plans allow 100 scheduling with
                  advanced features like Detailed Analytics and Auto-Add Trending Hashtags.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="rounded-md hover:bg-accent/20 border-0 border-b">
                <AccordionTrigger  className="px-4 w-full hover:no-underline border-b text-base">Can I use Tweetmash for multiple accounts?</AccordionTrigger>
                <AccordionContent className="px-4 w-full pt-3 bg-accent/30 text-base">
                  Yes! Premium plans allow you to connect and manage multiple Twitter accounts from a single dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full h-60 px-20 pt-10 flex flex-col justify-start items-center bg-muted/50 rounded-t-[3rem]">
        <div className="w-full flex justify-between items-center py-10">
          <div className="w-[50%] flex justify-start items-center">
            <Link to="">
              <Logo size="lg" />
            </Link>
          </div>

          <div className="w-[50%] flex flex-col gap-3 justify-end items-end">
            <div className="flex justify-center items-center gap-6">
              <Link
                to="https://x.com/the_t3ch_wizard"
                className="text-sm font-medium text-muted-foregrounda transition-colors hover:text-foreground"
              >
                <BsTwitterX className="size-7" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/ayushkumarmaurya01/"
                target="_blank"
                className="text-sm font-medium text-muted-foregrounda transition-colors hover:text-foreground"
              >
                <SiLinkedin  className="size-7" />
              </Link>
            </div>
            <p className="flex justify-center items-center gap-2 text-center text-sm leading-loose text-muted-foregrounda">
              <p>
                Copyright ©2025 Tweetmash
              </p>
              <span>|</span>
              <Link
                to="/contact-us"
                className="text-sm font-medium transition-colors hover:text-[#1DA1F2]"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
        <Separator />
        <div className="h-16">
        </div>
      </footer>

    </div>
  )


}
