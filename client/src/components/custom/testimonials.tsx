import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    text: "The 'angry tweet' tone went viral for our protest campaign!",
    author: "@ActivistOrg",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    text: "I've tripled my engagement since using TweetMash's AI tools.",
    author: "@ContentCreator",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    text: "Their scheduling system is a game-changer for our marketing team.",
    author: "@TechStartup",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    text: "Finally, an AI tool that actually sounds like me!",
    author: "@Influencer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextTestimonial, 5000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused])

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">User Love</h2>
        <p className="text-muted-foreground mt-2">What our users say about us</p>
      </div>

      <div
        className="relative max-w-3xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card className="mx-4 bg-primary/5 border-none">
                  <CardContent className="pt-6 relative">
                    <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                    <p className="text-xl text-center px-12 py-6">"{testimonial.text}"</p>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author[1]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{testimonial.author}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-primary/30",
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

