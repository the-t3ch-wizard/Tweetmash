import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { BsTwitterX } from "react-icons/bs"
import { FaLinkedinIn } from "react-icons/fa6"

export default function ContactMethods() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Methods</CardTitle>
        <CardDescription>Choose the way that works best for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-full">
            <BsTwitterX className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Twitter DM</h3>
            <p className="text-sm text-muted-foreground">Reach out to me directly on Twitter</p>
            <Button variant="link" className="px-0 h-auto" asChild>
              <Link to="https://twitter.com/the_t3ch_wizard" target="_blank" rel="noopener noreferrer">
                @the_t3ch_wizard
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-full">
            <FaLinkedinIn className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">LinkedIn</h3>
            <p className="text-sm text-muted-foreground">Connect professionally</p>
            <Button variant="link" className="px-0 h-auto" asChild>
              <Link to="https://www.linkedin.com/in/ayushkumarmaurya01/" target="_blank" rel="noopener noreferrer">
                Ayush Kumar Maurya
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}