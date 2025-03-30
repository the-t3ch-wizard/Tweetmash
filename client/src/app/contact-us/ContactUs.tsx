import ContactForm from "@/components/custom/contact-form"
import ContactMethods from "@/components/custom/contact-methods"
import PageHeader from "@/components/custom/page-header"
import TrustBuilders from "@/components/custom/trust-builders"
import { useLocation } from "react-router-dom"

export const ContactUs = () => {

  const data = useLocation();
  
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl ">
      <PageHeader
        title="Reach Out!"
        description="Got questions? Feature requests? Or just want to give some feedback?"
        icon="📩"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10">
        <ContactForm subject={data.state?.subject} />
        <div className="flex flex-col justify-between gap-4">
          <TrustBuilders />
          <ContactMethods />
        </div>
      </div>
    </main>
  )
}
