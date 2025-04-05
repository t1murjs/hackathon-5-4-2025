import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ReviewCardProps {
  review: {
    id: string
    author: string
    date: string
    rating: number
    comment: string
  }
}

// Using explicit named export
export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="font-medium">{review.author}</div>
          <div className="text-sm text-gray-500">{review.date}</div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p>{review.comment}</p>
      </CardContent>
    </Card>
  )
}

