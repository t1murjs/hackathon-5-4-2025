const {CourseModel} = require('../MongoSchemas/Course')
const {ReviewModel} = require('../MongoSchemas/Review')
const mongoose = require('mongoose')

const AddCourse = async (name, description, code, teachingMode = 'Online') => {
    const course = await CourseModel({ name, description, code, teachingMode })
    return await course.save()
}
    
const RemoveCourse = async (name, code) => {
    //TODO: Check if the requester is the owner
    // const course = await CourseModel.findOneAndDelete({name:name, code:code })
    if (!course) throw new Error('Course not found')

    // Remove all associated reviews
    await ReviewModel.deleteMany({ ReviewedCourse: course._id })

    return course
}
    

const UpvoteCourse = async (courseId, userId) => {
    console.log(courseId, userId)
    const objectId = new mongoose.Types.ObjectId(userId);

    const updatedCourse = await CourseModel.findOneAndUpdate(
        { _id: courseId },
        [
            {
                $set: {
                    upvotes: {
                        $cond: {
                            if: { $in: [objectId, "$upvotes"] },
                            then: { $setDifference: ["$upvotes", [objectId]] },
                            else: { $setUnion: ["$upvotes", [objectId]] }
                        }
                    }
                }
            }
        ],
        { new: true }
    );

    return {
        message: updatedCourse.upvotes.includes(objectId)
            ? "Course upvoted"
            : "Upvote removed",
        upvotes: updatedCourse.upvotes.length
    };
};


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

const UpvoteReview = async (reviewId, userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    const updatedReview = await ReviewModel.findOneAndUpdate(
        { _id: reviewId },
        [
            {
                $set: {
                    upvotes: {
                        $cond: {
                            if: { $in: [objectId, "$upvotes"] },
                            then: { $setDifference: ["$upvotes", [objectId]] },
                            else: { $setUnion: ["$upvotes", [objectId]] }
                        }
                    }
                }
            }
        ],
        { new: true }
    );

    return {
        message: updatedReview.upvotes.includes(objectId)
            ? "Review upvoted"
            : "Upvote removed",
        upvotes: updatedReview.upvotes.length
    };
};



module.exports = {
    AddCourse,
    RemoveCourse,
    UpvoteCourse,
    AddCourseReview,
    RemoveCourseReview,
    UpvoteReview
}