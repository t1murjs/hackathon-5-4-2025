"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import Link from "next/link"
import { ReviewCard } from "@/components/review-card"
import { getHomeRoute } from "@/lib/routes"

// Mock data for the prototype
const coursesData = {
  "1": {
    id: "1",
    name: "Introduction to Computer Science",
    description: "Basic concepts of computer science and programming",
    rating: 4.2,
    reviews: [
      {
        id: "r1",
        author: "Student A",
        date: "2023-10-15",
        rating: 5,
        comment:
          "Great introduction to the field! The professor was very engaging and the assignments were challenging but doable.",
      },
      {
        id: "r2",
        author: "Student B",
        date: "2023-09-28",
        rating: 4,
        comment: "Good course overall. Some topics were rushed but the materials provided were excellent.",
      },
      {
        id: "r3",
        author: "Student C",
        date: "2023-09-05",
        rating: 3,
        comment: "The course content was good but the lectures were sometimes hard to follow.",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Data Structures and Algorithms",
    description: "Fundamental data structures and algorithm design techniques",
    rating: 3.8,
    reviews: [
      {
        id: "r1",
        author: "Student D",
        date: "2023-10-10",
        rating: 4,
        comment: "Very informative course. The programming assignments really helped solidify the concepts.",
      },
      {
        id: "r2",
        author: "Student E",
        date: "2023-09-22",
        rating: 3,
        comment: "The course was challenging but rewarding. More examples would have been helpful.",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Web Development",
    description: "Building modern web applications with HTML, CSS, and JavaScript",
    rating: 4.5,
    reviews: [
      {
        id: "r1",
        author: "Student F",
        date: "2023-10-18",
        rating: 5,
        comment: "Excellent course! I learned so much about modern web development practices.",
      },
      {
        id: "r2",
        author: "Student G",
        date: "2023-10-05",
        rating: 4,
        comment: "The project-based approach was very effective. Great hands-on experience.",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Database Systems",
    description: "Principles of database design and management",
    rating: 3.9,
    reviews: [
      {
        id: "r1",
        author: "Student H",
        date: "2023-09-30",
        rating: 4,
        comment: "Good introduction to database concepts. The SQL exercises were particularly helpful.",
      },
      {
        id: "r2",
        author: "Student I",
        date: "2023-09-15",
        rating: 3,
        comment: "The course covered a lot of material. Sometimes felt rushed but overall good.",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Artificial Intelligence",
    description: "Introduction to AI concepts and applications",
    rating: 4.7,
    reviews: [
      {
        id: "r1",
        author: "Student J",
        date: "2023-10-20",
        rating: 5,
        comment: "Fascinating course! The professor made complex concepts accessible and interesting.",
      },
      {
        id: "r2",
        author: "Student K",
        date: "2023-10-12",
        rating: 5,
        comment: "One of the best courses I've taken. Great balance of theory and practical applications.",
      },
    ],
  },
  "6": {
    id: "6",
    name: "Software Engineering",
    description: "Principles and practices of software development",
    rating: 4.0,
    reviews: [
      {
        id: "r1",
        author: "Student L",
        date: "2023-10-08",
        rating: 4,
        comment:
          "The group project was a great learning experience. Good overview of the software development lifecycle.",
      },
      {
        id: "r2",
        author: "Student M",
        date: "2023-09-25",
        rating: 4,
        comment: "Practical and informative. The guest lectures from industry professionals were a highlight.",
      },
    ],
  },
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviews, setReviews] = useState(coursesData[params.id as keyof typeof coursesData]?.reviews || [])

  const course = coursesData[params.id as keyof typeof coursesData]

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link href={getHomeRoute()}>
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmitReview = () => {
    if (rating === 0) return

    const newReview = {
      id: `r${reviews.length + 1}`,
      author: "You",
      date: new Date().toISOString().split("T")[0],
      rating,
      comment,
    }

    setReviews([newReview, ...reviews])
    setRating(0)
    setComment("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Course Roasting System</h1>
            <div className="flex items-center gap-4">
              <Link href={getHomeRoute()}>
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{course.name}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{course.rating.toFixed(1)}</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 cursor-pointer ${
                        i < (hoveredRating || rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {rating ? `You selected ${rating} star${rating !== 1 ? "s" : ""}` : "Select a rating"}
                  </span>
                </div>
              </div>
              <Textarea
                placeholder="Share your thoughts about this course..."
                className="mb-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleSubmitReview} disabled={rating === 0}>
                Submit Review
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center text-gray-500">
                No reviews yet. Be the first to review this course!
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

