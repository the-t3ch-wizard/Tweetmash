import { ConnectTwitterFail } from "@/components/custom/connect-twitter-fail";
import { ConnectTwitterLoading } from "@/components/custom/connect-twitter-loading";
import { ConnectTwitterStep1 } from "@/components/custom/connect-twitter-step1";
import { ConnectTwitterStep2 } from "@/components/custom/connect-twitter-step2";
import { ConnectTwitterSuccess } from "@/components/custom/connect-twitter-success";
import { useAppSelector } from "@/lib/store/hooks/hooks";

export const ConnectTwitter = () => {

  const loading = useAppSelector(state => state.connectTwitter.loading)
  const connectionStage = useAppSelector(state => state.connectTwitter.connectionStage)
  
  return (
    <div className='w-full h-full  flex flex-col justify-center items-center p-4'>

      {
        loading === true ? 
        <ConnectTwitterLoading /> :
        connectionStage === 1 ?
        <ConnectTwitterStep1 /> :
        connectionStage === 2 ?
        <ConnectTwitterStep2 /> :
        connectionStage === 3 ?
        <ConnectTwitterSuccess /> :
        connectionStage === 4 ?
        <ConnectTwitterFail /> :
        null
      }
      
    </div>
  )
}
