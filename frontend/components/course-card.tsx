import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
  course: {
    id: string
    name: string
    description: string
    rating: number
    reviews: number
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full transition-all hover:shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({course.reviews} reviews)</span>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-500">Click to view details and reviews</p>
        </CardFooter>
      </Card>
    </Link>
  )
}

