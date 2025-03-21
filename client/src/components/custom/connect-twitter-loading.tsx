import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { RiTwitterXLine } from 'react-icons/ri'

export const ConnectTwitterLoading = () => {
  return (
    <Card className="w-96 flex flex-col gap-2">

      <CardHeader>
        <Skeleton className="w-full h-32 flex justify-center items-center opacity-25">
          <RiTwitterXLine size="3rem" />
        </Skeleton>

        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Skeleton className="w-full h-10" />
      </CardFooter>

    </Card>
  )
}
