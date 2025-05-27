import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Careers | Form(X)",
  description: "Join our team and help shape the future of digital manufacturing.",
}

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
}

const jobPositions: JobPosition[] = [
  {
    id: "manufacturing-engineer",
    title: "Manufacturing Engineer",
    department: "Engineering",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    description:
      "We're looking for a Manufacturing Engineer to help optimize our production processes and implement new manufacturing technologies.",
    requirements: [
      "Bachelor's degree in Manufacturing Engineering, Mechanical Engineering, or related field",
      "3+ years of experience in manufacturing engineering",
      "Experience with CNC machining, 3D printing, and sheet metal fabrication",
      "Knowledge of CAD/CAM software and manufacturing process optimization",
      "Strong problem-solving skills and attention to detail",
    ],
    responsibilities: [
      "Develop and optimize manufacturing processes for various production methods",
      "Collaborate with design engineers to ensure manufacturability of parts",
      "Implement quality control procedures and continuous improvement initiatives",
      "Evaluate new manufacturing technologies and recommend implementation strategies",
      "Support production teams in troubleshooting manufacturing issues",
    ],
  },
  {
    id: "software-engineer",
    title: "Software Engineer (Full Stack)",
    department: "Technology",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Join our engineering team to build and enhance our digital manufacturing platform with cutting-edge technologies.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in full-stack development",
      "Proficiency in React, Next.js, and TypeScript",
      "Experience with 3D visualization libraries (Three.js preferred)",
      "Knowledge of cloud infrastructure and serverless architectures",
    ],
    responsibilities: [
      "Develop and maintain features for our manufacturing platform",
      "Implement 3D visualization tools for part analysis and configuration",
      "Build and optimize APIs for real-time pricing and manufacturability analysis",
      "Collaborate with UX designers to create intuitive user interfaces",
      "Participate in code reviews and technical planning sessions",
    ],
  },
  {
    id: "sales-representative",
    title: "Technical Sales Representative",
    department: "Sales",
    location: "Chicago, IL (Hybrid)",
    type: "Full-time",
    description:
      "We're seeking a Technical Sales Representative to help grow our customer base and provide expert guidance on manufacturing solutions.",
    requirements: [
      "Bachelor's degree in Engineering, Business, or related field",
      "2+ years of experience in technical sales or manufacturing",
      "Understanding of manufacturing processes and technologies",
      "Excellent communication and presentation skills",
      "Ability to understand technical requirements and translate them into solutions",
    ],
    responsibilities: [
      "Develop and maintain relationships with key clients and prospects",
      "Provide technical guidance on manufacturing solutions and capabilities",
      "Collaborate with engineering teams to address client requirements",
      "Prepare and deliver presentations and proposals to potential clients",
      "Represent the company at industry events and trade shows",
    ],
  },
]

export default function CareersPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Join Our <span className="text-brand-dark-gold">Team</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Help us revolutionize digital manufacturing and bring innovative solutions to life. We're looking for
                passionate individuals who want to make an impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
                  View Open Positions
                </Button>
                <Button variant="outline">Our Culture</Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src="/modern-manufacturing.png"
                alt="Team working in modern manufacturing environment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark-gold/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-dark-gold"
                  >
                    <path d="M12 22v-5" />
                    <path d="M9 7V2" />
                    <path d="M15 7V2" />
                    <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-2a3 3 0 0 1 6 0v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="mt-2 text-gray-600">
                  We constantly push boundaries and explore new technologies to deliver cutting-edge manufacturing
                  solutions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark-gold/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-dark-gold"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="mt-2 text-gray-600">
                  We believe in the power of teamwork and open communication to solve complex manufacturing challenges.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark-gold/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-dark-gold"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Quality</h3>
                <p className="mt-2 text-gray-600">
                  We're committed to excellence in everything we do, from the parts we produce to the code we write.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="bg-gray-50 py-20">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Open Positions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join our team and help shape the future of digital manufacturing.
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
                <TabsTrigger value="all">All Departments</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-6">
                {jobPositions.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              <TabsContent value="engineering" className="space-y-6">
                {jobPositions
                  .filter((job) => job.department === "Engineering")
                  .map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
              </TabsContent>
              <TabsContent value="technology" className="space-y-6">
                {jobPositions
                  .filter((job) => job.department === "Technology")
                  .map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
              </TabsContent>
              <TabsContent value="sales" className="space-y-6">
                {jobPositions
                  .filter((job) => job.department === "Sales")
                  .map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benefits & Perks</h2>
              <p className="mt-4 text-lg text-gray-600">
                We believe in taking care of our team members with competitive benefits and a supportive work
                environment.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 flex-shrink-0 text-brand-dark-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Competitive salary and equity packages</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 flex-shrink-0 text-brand-dark-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Comprehensive health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 flex-shrink-0 text-brand-dark-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Flexible work arrangements and generous PTO</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 flex-shrink-0 text-brand-dark-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>401(k) matching and financial wellness programs</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 flex-shrink-0 text-brand-dark-gold"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Professional development and learning opportunities</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/placeholder-cequt.png"
                  alt="Team collaboration"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/placeholder-hwfh1.png"
                  alt="Office environment"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder-ldc82.png"
                  alt="Team building event"
                  width={800}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark-gold py-16">
        <div className="container max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Don't see the right position?</h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how
              you can contribute.
            </p>
            <Link href="/contact" className="mt-8">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function JobCard({ job }: { job: JobPosition }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4l-4 4-4-4H4a2 2 0 0 1-2-2V5Z" />
                  </svg>
                  {job.department}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {job.location}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                  >
                    <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                    <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M18 18v-6" />
                  </svg>
                  {job.type}
                </span>
              </div>
            </div>
            <Link href={`/careers/${job.id}`}>
              <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">Apply Now</Button>
            </Link>
          </div>
          <p className="mt-4 text-gray-600">{job.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium">Requirements</h4>
              <ul className="mt-2 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5 flex-shrink-0 text-brand-dark-gold"
                    >
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Responsibilities</h4>
              <ul className="mt-2 space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5 flex-shrink-0 text-brand-dark-gold"
                    >
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span className="text-sm">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
