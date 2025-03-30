import { Shield, Clock, Sparkles, MessageCircle, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrustBuilders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Made with Love</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Your feedback shapes this app!</p>
            <p className="text-sm text-muted-foreground">
              Found a bug? Want a feature? I'd love to hear from you.
            </p>
          </div>
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Completely free (for now!)</p>
            <p className="text-sm text-muted-foreground">
              Built nights & weekends to help fellow creators.
            </p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

