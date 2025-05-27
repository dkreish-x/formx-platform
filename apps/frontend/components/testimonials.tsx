import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "The instant quoting system saved us countless hours of back-and-forth with suppliers. We got our parts faster than ever before.",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "TechInnovate",
    avatar: "SJ",
  },
  {
    quote:
      "Form(X)'s auto-quoting platform gave us the ability to quickly iterate on our designs with real-time cost feedback. Game changer for our product development.",
    author: "Michael Chen",
    role: "Mechanical Engineer",
    company: "NextGen Robotics",
    avatar: "MC",
  },
  {
    quote:
      "The quality of the CNC milled parts we received was exceptional, and the pricing was transparent throughout the entire process.",
    author: "David Rodriguez",
    role: "Design Director",
    company: "Creative Solutions",
    avatar: "DR",
  },
]

export default function Testimonials() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
      <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mb-8">
        Trusted by innovative companies for quality manufacturing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="text-left">
            <CardHeader>
              <p className="text-lg italic">"{testimonial.quote}"</p>
            </CardHeader>
            <CardFooter className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{testimonial.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
