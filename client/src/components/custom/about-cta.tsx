import { Button } from "@/components/ui/button"

export const AboutCta = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Twitter Game?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of creators, marketers, and businesses who are supercharging their Twitter presence with
          TweetMash.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">🚀 Start Free Today</Button>
          <Button variant="outline" size="lg">
            📞 Talk to Our Team
          </Button>
        </div>
      </div>
    </section>
  )
}
