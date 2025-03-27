import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userLoginSchema } from "@/validations/user"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { login } from "@/services/user"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/lib/store/hooks/hooks"
import { setUserDetails } from "@/lib/store/features/user/userSlice"

export const AppLogin = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof userLoginSchema>) {
    try {
      const response = await login(values)
      dispatch(setUserDetails({
        _id: response?.data?.id,
        name: response?.data?.name,
        email: response?.data?.email,
        twitterUsername: response?.data?.twitterUsername,
        twitterConnected: response?.data?.twitterConnected ? response?.data?.twitterConnected : false,
      }))
      
      if (response?.data?.twitterConnected === true){
        navigate("/dashboard")
      } else {
        navigate("/connect/twitter")
      }
      form.reset()
      closeButtonRef.current?.click()
      window.location.reload()
    } catch (error: any) {
      console.log('ERROR', error)
      return toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
    }
  }

  return (
    <Drawer>

      <DrawerTrigger className="w-full">
        <Button variant='outline' className='w-full flex justify-center items-center gap-2'>
          Log in
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full h-[80%] flex justify-start items-center">
        <DrawerHeader className="py-16 md:py-28  w-full flex flex-col justify-center items-center">
          <DrawerTitle className="text-3xl font-bold">
            Log in
          </DrawerTitle>
          <DrawerDescription className="p-6 w-[80%] md:w-[45%] sm:w-[65%] transition-all duration-300 bg-redaa-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@mail.com" type="email" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" className="text-foreground" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2 w-full">
                  <Button type="submit" className="w-full">Submit</Button>
                    <Button variant="outline" type="reset" className="w-full">Cancel</Button>
                </div>
                <DrawerClose className="hidden" ref={closeButtonRef}>
                </DrawerClose>
              </form>
            </Form>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
