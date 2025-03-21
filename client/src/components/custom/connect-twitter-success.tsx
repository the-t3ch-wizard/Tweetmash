import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { MdDone } from 'react-icons/md'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const ConnectTwitterSuccess = () => {
  return (
    <Card className="w-96 flex flex-col gap-2">

      <CardHeader>
        <div className="w-full h-32 flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] border rounded-full flex justify-center items-center bg-green-500">
            <MdDone size="3rem" />
          </div>
        </div>
        <CardTitle className="text-xl">Connected your Twitter Account Successfully!</CardTitle>
        <CardDescription>Please go to dashboard, inorder to explore more.</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button className="w-full">
          <Link to={"/dashboard"} className="flex gap-2 justify-center items-center">
            <ArrowRight />
            <p>
              Go to Dashboard
            </p>
          </Link>
        </Button>
      </CardFooter>
      
    </Card>
  )
}
