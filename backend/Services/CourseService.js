const {CourseModel} = require('../MongoSchemas/Course')
const {ReviewModel} = require('../MongoSchemas/Review')

const AddCourse = async (name, description, code, teachingMode = 'Online') => {
    const course = await CourseModel({ name, description, code, teachingMode })
    return await course.save()
}
    
const RemoveCourse = async (name, code) => {
    const course = await CourseModel.findOneAndDelete({name:name, code:code })
    if (!course) throw new Error('Course not found')

    // Remove all associated reviews
    await ReviewModel.deleteMany({ ReviewedCourse: course._id })

    return course
}
    

const UpvoteCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId)
    if (!course) throw new Error('Course not found')
    if (course.rating < 5) course.rating += 1
    return await course.save()
}

const DownvoteCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId)
    if (!course) throw new Error('Course not found')
    if (course.rating > 1) course.rating -= 1
    return await course.save()
}

const AddCourseReview = async (reviewerId, courseId, reviewText, rating) => {
    const review = await ReviewModel({
        Reviewer: reviewerId,
        ReviewedCourse: courseId,
        Review: reviewText,
        Rating: rating
    })

    const savedReview = await review.save()

    // Add review to course
    await CourseModel.findByIdAndUpdate(courseId, {
        $push: { reviews: savedReview._id }
    })

    return savedReview
}

const RemoveCourseReview = async (reviewId) => {
    const review = await ReviewModel.findByIdAndDelete(reviewId)
    if (!review) throw new Error('Review not found')

    // Remove from course
    await CourseModel.findByIdAndUpdate(review.ReviewedCourse, {
        $pull: { reviews: review._id }
    })

    return review
}

const UpvoteReview = async (reviewId) => {
    return { message: 'Upvote not implemented yet' }
}

const DownvoteReview = async (reviewId) => {
    return { message: 'Downvote not implemented yet' }
}

module.exports = {
    AddCourse,
    RemoveCourse,
    UpvoteCourse,
    DownvoteCourse,
    AddCourseReview,
    RemoveCourseReview,
    UpvoteReview,
    DownvoteReview
}