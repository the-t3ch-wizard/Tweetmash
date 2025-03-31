import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"
import { responseType } from "@/types/api";
import { contactFormSchema } from "@/validations/contact/contact-form";
import { z } from "zod";

export const sendContactUsMail = async (contactDetails: z.infer<typeof contactFormSchema>) : Promise<responseType> => {
  const response = await axiosInstance.post(API_ENDPOINTS.CONTACT.BASE, contactDetails)
  
  return response.data;
}
