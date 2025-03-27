import { Button } from "@/components/ui/button"

export const AboutHero = () => {
  return (
    <div className="py-12 md:py-20 text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-4xl text-white">🐦</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400">
        Tweet Smarter, Not Harder – Powered by AI
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Supercharge your Twitter growth.
      </p>
    </div>
  )
}
