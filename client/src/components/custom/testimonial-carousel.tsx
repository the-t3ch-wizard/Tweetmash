import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Testimonial = {
  name: string
  handle: string
  role: string
  content: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Social Media Pro",
    handle: "@SocialMediaPro",
    role: "Marketing Agency CEO",
    content:
      "TweetMash cut our content creation time by 70%. The AI writes better tweets than my interns! Now we manage 20+ client accounts effortlessly.",
  },
  {
    name: "Startup Guru",
    handle: "@StartupGuru",
    role: "Tech Founder",
    content:
      "Went viral 3x in a month thanks to Trending Hashtags feature. My engagement grew by 240%—worth every penny of the Premium plan!",
  },
  {
    name: "Travel With Me",
    handle: "@TravelWithMe",
    role: "Lifestyle Influencer",
    content:
      "I travel 24/7 and still post daily. The 'humorous' tone setting makes my tweets sound like me. Followers think I've hired a ghostwriter!",
  },
  {
    name: "NFT Artist",
    handle: "@NFTArtist",
    role: "Digital Creator",
    content:
      "Thread generator is a game-changer. My NFT project explanations now get 5x more clicks. Even my competitors asked what tool I use!",
  },
  {
    name: "Freelance Wizard",
    handle: "@FreelanceWizard",
    role: "Solopreneur",
    content:
      "Free plan was great, but Premium's analytics helped me double my freelance clients. The 'optimal time' feature is scarily accurate.",
  },
  {
    name: "Mom Blogger",
    handle: "@MomBlogger",
    role: "Parenting Content",
    content:
      "No time to tweet with kids? TweetMash saved me. The 'calm' tone keeps my brand voice consistent. Now I post even during naptime!",
  },
  {
    name: "VC Investor",
    handle: "@VCInvestor",
    role: "Finance Expert",
    content:
      "The 'controversial' tone gets me into debates (and followers). My thought leadership grew faster than my portfolio!",
  },
  {
    name: "B2B Marketer",
    handle: "@B2BMarketer",
    role: "SaaS Growth",
    content:
      "Multi-account support lets me manage our company and CEO's profile in one place. Team features are a lifesaver!",
  },
  {
    name: "Crypto Bro",
    handle: "@CryptoBro",
    role: "Bitcoin Trader",
    content: "Auto-trending hashtags put my crypto tweets in front of 100K+ eyes. Even Elon's bots retweet me now. 😂",
  },
  {
    name: "Nonprofit Hero",
    handle: "@NonProfitHero",
    role: "NGO Director",
    content:
      "Free plan helped us schedule donation drives. Upgraded to Premium for analytics—now we target donors 3x more effectively!",
  },
]

export function TestimonialCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate testimonials to create a seamless loop
  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="relative overflow-hidden w-[90%]">
      <div className="absolute -left-5 h-full w-10 bg-background blur-md z-10">
      </div>
      <div className="absolute -right-5 h-full w-10 bg-background blur-md z-10">
      </div>
      <div
        ref={containerRef}
        className={`flex gap-4 ${isPaused ? "" : "animate-carousel"}`}
        style={{
          width: `${allTestimonials.length * 320}px`,
        }}
      >
        {allTestimonials.map((testimonial, index) => (
          <div key={index} className="w-[300px] flex-shrink-0">
            <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white">
                    <span className="font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{testimonial.name}</span>
                      <span className="text-sm text-muted-foreground">{testimonial.handle}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{testimonial.role}</p>
                    <p className="text-sm">"{testimonial.content}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

