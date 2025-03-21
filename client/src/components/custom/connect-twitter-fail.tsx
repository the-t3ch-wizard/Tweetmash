import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { RxCross2 } from 'react-icons/rx'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import { setConnectionStage, setOauthToken } from '@/lib/store/features/connectTwitter/connectTwitterSlice'

export const ConnectTwitterFail = () => {

  const dispatch = useAppDispatch();

  const tryAgainHandler = () => {
    dispatch(setConnectionStage(1))
    dispatch(setOauthToken(""))
  }

  return (
    <Card className="w-96 flex flex-col gap-2">

      <CardHeader>
        <div className="w-full h-32 flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] border rounded-full flex justify-center items-center bg-destructive">
            <RxCross2 size="3rem" />
          </div>
        </div>
        <CardTitle className="text-xl">Unable to connected your Twitter Account!</CardTitle>
        <CardDescription>Please connect your Twitter account to enable all features.</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button className="w-full p-0" onClick={tryAgainHandler}>
          <ArrowRight />
          <p>
            Try connecting again!
          </p>
        </Button>
      </CardFooter>
      
    </Card>
  )
}
