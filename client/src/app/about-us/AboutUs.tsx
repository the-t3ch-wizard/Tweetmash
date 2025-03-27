import {AboutCta} from "@/components/custom/about-cta"
import {AboutHero} from "@/components/custom/about-hero"
import OurStory from "@/components/custom/our-story"
import TeamSection from "@/components/custom/team-section"
import Testimonials from "@/components/custom/testimonials"
import WhyChooseUs from "@/components/custom/why-choose-us"

export const AboutUs = () => {
  
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <AboutHero />
      <OurStory />
      <TeamSection />
      <WhyChooseUs />
      <Testimonials />
      <AboutCta />
    </main>
  )
}
