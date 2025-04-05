import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CourseCard } from "@/components/course-card"
import Link from "next/link"
import { getSignInRoute } from "@/lib/routes"

// Mock data for the prototype
const courses = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    description: "Basic concepts of computer science and programming",
    rating: 4.2,
    reviews: 45,
  },
  {
    id: "2",
    name: "Data Structures and Algorithms",
    description: "Fundamental data structures and algorithm design techniques",
    rating: 3.8,
    reviews: 32,
  },
  {
    id: "3",
    name: "Web Development",
    description: "Building modern web applications with HTML, CSS, and JavaScript",
    rating: 4.5,
    reviews: 56,
  },
  {
    id: "4",
    name: "Database Systems",
    description: "Principles of database design and management",
    rating: 3.9,
    reviews: 28,
  },
  {
    id: "5",
    name: "Artificial Intelligence",
    description: "Introduction to AI concepts and applications",
    rating: 4.7,
    reviews: 39,
  },
  {
    id: "6",
    name: "Software Engineering",
    description: "Principles and practices of software development",
    rating: 4.0,
    reviews: 41,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Course Roasting System</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">student@tuni.fi</span>
              <Link href={getSignInRoute()}>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Which course do you want to roast?</h2>
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Search courses..." className="flex-1" />
            <Button type="submit">Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  )
}

