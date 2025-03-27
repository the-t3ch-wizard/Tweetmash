import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OurStory() {
  const timelineEvents = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Frustrated by manual tweeting, our founder built a simple AI scheduler",
    },
    {
      year: "2024",
      title: "Public Launch",
      description: "Launched TweetMash after 200+ beta testers saw 3x engagement",
    },
    {
      year: "Today",
      title: "Growth Stage",
      description: "Helping 10,000+ users automate their Twitter success",
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Story</h2>
        <p className="text-muted-foreground mt-2">The journey that brought us here</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted" />

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              } md:justify-center`}
            >
              <div
                className={`md:absolute md:top-1/2 md:transform md:-translate-y-1/2 ${
                  index % 2 === 0 ? "md:left-0" : "md:right-0"
                } md:w-[45%] w-full max-w-md`}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
                        {event.year}
                      </span>
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

