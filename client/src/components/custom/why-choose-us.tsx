import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ShieldCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI That Gets You",
    description: "Learns your brand voice over time",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Machine Mode",
    description: "Schedule tweets years in advance",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "No-Gibberish Guarantee",
    description: "Human-quality tweets or we'll rewrite",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose TweetMash?</h2>
        <p className="text-muted-foreground mt-2">What makes us different</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1.5 bg-primary/10 rounded-bl-lg">{feature.icon}</div>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Badge variant="secondary" className="text-sm py-1.5">
          Twitter API Verified Partner
        </Badge>
        <Badge variant="secondary" className="text-sm py-1.5">
          <ShieldCheck className="mr-1 h-3.5 w-3.5" />
          100% Data Privacy
        </Badge>
      </div>
    </section>
  )
}

