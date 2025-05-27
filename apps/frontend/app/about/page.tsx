import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Factory, Award, Clock, Zap } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About FormX | Precision Manufacturing",
  description: "Learn about FormX's journey, our team, and our commitment to precision manufacturing excellence.",
}

export default function AboutPage() {
  return (
    <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          About <span className="text-brand-dark-gold">FormX</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          We're on a mission to revolutionize manufacturing with cutting-edge technology and exceptional service.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 mb-4">
            Founded in 2015, FormX began with a simple idea: make high-quality manufacturing accessible to everyone,
            from startups to established enterprises.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our founders, with backgrounds in mechanical engineering and software development, recognized the challenges
            businesses faced when trying to source custom parts. The process was slow, expensive, and often frustrating.
          </p>
          <p className="text-lg text-gray-600">
            Today, FormX has grown into a team of over 50 manufacturing experts, engineers, and technology specialists
            dedicated to streamlining the manufacturing process through innovation and exceptional service.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/placeholder.svg?height=600&width=800&query=modern%20manufacturing%20facility%20with%20cnc%20machines%20and%20workers%20high%20tech%20factory%20photorealistic"
            alt="Modern manufacturing facility"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="bg-brand-light-gold/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Our Leadership Team</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Meet the experts behind FormX's success. Our leadership team brings decades of combined experience in
          manufacturing, engineering, and technology.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-brand-dark-gold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/20 rounded-2xl p-8 md:p-12 mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">FormX by the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-brand-dark-gold mb-2">{stat.value}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to work with us?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you're looking for a manufacturing partner for your next project or interested in joining our team,
          we'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote">
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white px-6 py-3 text-lg">
              Get a Quote
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-dark-gold hover:text-white px-6 py-3 text-lg"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality. Every part we produce undergoes rigorous inspection to ensure it meets our exacting standards.",
    icon: <Award className="h-6 w-6 text-brand-dark-gold" />,
  },
  {
    title: "Innovation",
    description:
      "We continuously invest in the latest manufacturing technologies and processes to deliver better parts, faster and more efficiently.",
    icon: <Zap className="h-6 w-6 text-brand-dark-gold" />,
  },
  {
    title: "Customer Success",
    description:
      "Your success is our success. We work closely with you to understand your needs and deliver solutions that help your business thrive.",
    icon: <Users className="h-6 w-6 text-brand-dark-gold" />,
  },
  {
    title: "Sustainability",
    description:
      "We're committed to environmentally responsible manufacturing practices that minimize waste and reduce our carbon footprint.",
    icon: <Factory className="h-6 w-6 text-brand-dark-gold" />,
  },
  {
    title: "Reliability",
    description:
      "When we make a promise, we keep it. Count on us for on-time delivery and consistent results, every time.",
    icon: <Clock className="h-6 w-6 text-brand-dark-gold" />,
  },
  {
    title: "Transparency",
    description:
      "No hidden fees or surprises. We believe in clear communication and straightforward pricing throughout the manufacturing process.",
    icon: <CheckCircle className="h-6 w-6 text-brand-dark-gold" />,
  },
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image:
      "/placeholder.svg?height=300&width=300&query=professional%20headshot%20asian%20woman%20executive%20manufacturing%20CEO%20photorealistic",
    bio: "With 15+ years in mechanical engineering and manufacturing, Sarah leads FormX's vision and strategy with a focus on innovation and quality.",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    image:
      "/placeholder.svg?height=300&width=300&query=professional%20headshot%20hispanic%20man%20executive%20manufacturing%20CTO%20photorealistic",
    bio: "Michael combines his software expertise with manufacturing knowledge to drive FormX's technological advancements and digital transformation.",
  },
  {
    name: "David Park",
    role: "Head of Operations",
    image:
      "/placeholder.svg?height=300&width=300&query=professional%20headshot%20asian%20man%20executive%20manufacturing%20operations%20photorealistic",
    bio: "David ensures our manufacturing processes run smoothly and efficiently, maintaining our commitment to quality and on-time delivery.",
  },
]

const stats = [
  { value: "1M+", label: "Parts Manufactured" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "99.7%", label: "On-Time Delivery" },
  { value: "24", label: "Countries Served" },
]
