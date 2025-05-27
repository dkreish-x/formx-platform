import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | FormX",
  description: "Get in touch with our manufacturing experts for quotes, support, or general inquiries.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Contact <span className="text-brand-dark-gold">Us</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Have questions or ready to start your next manufacturing project? Our team is here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <ContactCard
          icon={<Phone className="h-6 w-6 text-brand-dark-gold" />}
          title="Call Us"
          description="Speak directly with our manufacturing experts"
          contact="+1 (555) 123-4567"
          action="Call now"
          href="tel:+15551234567"
        />
        <ContactCard
          icon={<Mail className="h-6 w-6 text-brand-dark-gold" />}
          title="Email Us"
          description="Send us your questions or RFQs"
          contact="info@formx-manufacturing.com"
          action="Email now"
          href="mailto:info@formx-manufacturing.com"
        />
        <ContactCard
          icon={<MapPin className="h-6 w-6 text-brand-dark-gold" />}
          title="Visit Us"
          description="Tour our manufacturing facility"
          contact="123 Production Ave, Suite 100, San Francisco, CA 94103"
          action="Get directions"
          href="https://maps.google.com"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below and one of our manufacturing experts will get back to you within 24 hours.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inquiry-type">Inquiry type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quote">Request a quote</SelectItem>
                  <SelectItem value="info">General information</SelectItem>
                  <SelectItem value="support">Technical support</SelectItem>
                  <SelectItem value="partnership">Partnership opportunity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us about your project or inquiry..." className="min-h-[150px]" />
            </div>
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white w-full">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Location</h2>
          <div className="rounded-lg overflow-hidden h-[400px] mb-8">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=400&width=600&query=map of manufacturing facility in San Francisco')`,
              }}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-brand-dark-gold mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">
                  123 Production Ave, Suite 100
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-brand-dark-gold mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/20 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactCard({ icon, title, description, contact, action, href }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="bg-brand-light-gold/20 p-4 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="font-medium mb-6">{contact}</p>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-dark-gold hover:text-white"
          >
            {action}
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}

const faqs = [
  {
    question: "What information do I need to provide for a quote?",
    answer:
      "To provide an accurate quote, we typically need your CAD files, material specifications, desired quantity, surface finish requirements, and timeline. The more details you can provide, the more precise our quote will be.",
  },
  {
    question: "How long does it take to get a quote?",
    answer:
      "For standard parts, we typically provide quotes within 24-48 hours. Complex projects may take 3-5 business days as they require more detailed analysis.",
  },
  {
    question: "What file formats do you accept for CAD models?",
    answer:
      "We accept most common CAD formats including STEP, IGES, STP, X_T, SAT, and native files from popular CAD software like SolidWorks, AutoCAD, and Fusion 360.",
  },
  {
    question: "Do you offer expedited manufacturing services?",
    answer:
      "Yes, we offer expedited services for urgent projects. Rush fees may apply depending on the complexity and current production schedule.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "We have no minimum order quantity and can produce single prototypes or high-volume production runs depending on your needs.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International shipping costs and delivery times vary by destination.",
  },
]
