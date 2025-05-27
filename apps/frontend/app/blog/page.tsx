import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Manufacturing Blog | FormX",
  description: "Insights, tips, and news about manufacturing processes, materials, and industry trends.",
}

export default function BlogPage() {
  return (
    <div className="container max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Manufacturing <span className="text-brand-dark-gold">Insights</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Expert advice, industry trends, and manufacturing tips to help you bring your ideas to life.
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto bg-gray-100 relative">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=600&width=800&query=CNC machining advanced techniques')`,
                }}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-brand-dark-gold hover:bg-brand-dark-gold/90">Featured</Badge>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>May 15, 2025</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>8 min read</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Advanced CNC Machining Techniques for Complex Geometries</h2>
              <p className="text-gray-600 mb-6">
                Discover how 5-axis machining, specialized tooling, and optimized CAM strategies can help you achieve
                complex geometries that were previously impossible or cost-prohibitive.
              </p>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=100&width=100&query=professional headshot')`,
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium">Robert Chen</p>
                  <p className="text-sm text-gray-500">CNC Engineering Lead</p>
                </div>
              </div>
              <Link href="/blog/advanced-cnc-techniques">
                <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Blog Categories */}
      <Tabs defaultValue="all" className="w-full mb-16">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="design">Design Tips</TabsTrigger>
          <TabsTrigger value="industry">Industry News</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processes" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.category === "processes")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.category === "materials")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.category === "design")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="industry" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.category === "industry")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/20 rounded-2xl p-8 md:p-12">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold text-gray-900">Subscribe to our newsletter</h2>
            <p className="mt-2 text-gray-600">
              Get the latest manufacturing insights and tips delivered to your inbox monthly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-dark-gold"
            />
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogPostCard({ post }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 bg-gray-100 relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=400&width=600&query=${encodeURIComponent(post.title)}')`,
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white">
            {post.category === "processes" && "Manufacturing Processes"}
            {post.category === "materials" && "Materials"}
            {post.category === "design" && "Design Tips"}
            {post.category === "industry" && "Industry News"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime} read</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{post.author}</span>
          </div>
          <Link href={`/blog/${post.id}`}>
            <Button variant="ghost" className="text-brand-dark-gold hover:text-brand-dark-gold/90 p-0">
              Read more <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const blogPosts = [
  {
    id: "choosing-right-material",
    title: "How to Choose the Right Material for Your Project",
    excerpt:
      "A comprehensive guide to selecting the optimal material based on your application requirements and budget constraints.",
    date: "May 10, 2025",
    readTime: "6 min",
    author: "Jennifer Lee",
    category: "materials",
  },
  {
    id: "3d-printing-vs-cnc",
    title: "3D Printing vs. CNC Machining: Which is Right for You?",
    excerpt:
      "Compare these two popular manufacturing methods to determine which is best suited for your specific project needs.",
    date: "May 8, 2025",
    readTime: "7 min",
    author: "Michael Wong",
    category: "processes",
  },
  {
    id: "design-for-manufacturing",
    title: "Design for Manufacturing: 10 Tips to Reduce Costs",
    excerpt:
      "Learn how to optimize your designs to minimize manufacturing costs without compromising quality or functionality.",
    date: "May 5, 2025",
    readTime: "5 min",
    author: "David Chen",
    category: "design",
  },
  {
    id: "metal-3d-printing",
    title: "The Rise of Metal 3D Printing in Production",
    excerpt:
      "Discover how metal additive manufacturing is transforming production capabilities across various industries.",
    date: "May 1, 2025",
    readTime: "8 min",
    author: "Sarah Johnson",
    category: "industry",
  },
  {
    id: "surface-finishing-guide",
    title: "Complete Guide to Surface Finishing Options",
    excerpt:
      "Explore various surface finishing techniques and how they can enhance both the appearance and functionality of your parts.",
    date: "April 28, 2025",
    readTime: "9 min",
    author: "Robert Chen",
    category: "processes",
  },
  {
    id: "sustainable-manufacturing",
    title: "Sustainable Manufacturing Practices for 2025",
    excerpt:
      "How manufacturers are reducing environmental impact while maintaining quality and efficiency in their operations.",
    date: "April 25, 2025",
    readTime: "6 min",
    author: "Emma Davis",
    category: "industry",
  },
  {
    id: "aluminum-alloys-comparison",
    title: "Comparing Popular Aluminum Alloys for Manufacturing",
    excerpt: "An in-depth look at the properties, applications, and cost considerations of common aluminum alloys.",
    date: "April 22, 2025",
    readTime: "7 min",
    author: "James Wilson",
    category: "materials",
  },
  {
    id: "tolerances-explained",
    title: "Understanding Tolerances in Precision Manufacturing",
    excerpt: "Learn how to specify appropriate tolerances to balance precision requirements with manufacturing costs.",
    date: "April 18, 2025",
    readTime: "5 min",
    author: "Lisa Zhang",
    category: "design",
  },
  {
    id: "injection-molding-tips",
    title: "5 Common Injection Molding Defects and How to Prevent Them",
    excerpt: "Identify and address common issues in injection molding to improve part quality and reduce waste.",
    date: "April 15, 2025",
    readTime: "6 min",
    author: "Thomas Brown",
    category: "processes",
  },
]
