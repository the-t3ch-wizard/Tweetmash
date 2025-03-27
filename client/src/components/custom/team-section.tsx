import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Github } from "lucide-react"

const team = [
  {
    name: "Alex",
    role: "AI Architect",
    image: "/placeholder.svg?height=300&width=300",
    quote: "I train models to sound human, not robotic",
    socials: {
      twitter: "https://twitter.com/alex",
      linkedin: "https://linkedin.com/in/alex",
      github: "https://github.com/alex",
    },
  },
  {
    name: "Sam",
    role: "Growth Lead",
    image: "/placeholder.svg?height=300&width=300",
    quote: "My goal? Get your tweets 10x more eyeballs",
    socials: {
      twitter: "https://twitter.com/sam",
      linkedin: "https://linkedin.com/in/sam",
      github: "https://github.com/sam",
    },
  },
  {
    name: "Jordan",
    role: "Product Designer",
    image: "/placeholder.svg?height=300&width=300",
    quote: "Building interfaces that make tweeting a joy",
    socials: {
      twitter: "https://twitter.com/jordan",
      linkedin: "https://linkedin.com/in/jordan",
      github: "https://github.com/jordan",
    },
  },
]

export default function TeamSection() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Meet the Team</h2>
        <p className="text-muted-foreground mt-2">The people behind TweetMash</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card key={member.name} className="overflow-hidden group">
            <div className="relative overflow-hidden aspect-square">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="italic">"{member.quote}"</p>
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              <a
                href={member.socials.twitter}
                className="text-muted-foreground hover:text-primary"
                aria-label={`${member.name}'s Twitter`}
              >
                <Twitter size={18} />
              </a>
              <a
                href={member.socials.linkedin}
                className="text-muted-foreground hover:text-primary"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
              <a
                href={member.socials.github}
                className="text-muted-foreground hover:text-primary"
                aria-label={`${member.name}'s GitHub`}
              >
                <Github size={18} />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="outline">Join our team! We're hiring →</Button>
      </div>
    </section>
  )
}

