const express = require('express')
const cors = require('cors')
const session = require('express-session')
const {connectToMongoDatabase} = require('../MongooseConfiguration/MongooseConfig.js')
const {
    AddCourse,
    RemoveCourse,
    UpvoteCourse,
    AddCourseReview,
    RemoveCourseReview,
    UpvoteReview,
    GetAllCourses, 
    GetCourseById
} = require('../Services/CourseService')

const {
    RegisterUser,
    LoginUser,
    GetUserById
} = require('../Services/UserService')

const MongoStore = require('connect-mongodb-session')(session)

const store = new MongoStore({
    uri: process.env.MONGOOSE_CONNECTION_URI,
    collection: 'userSessions'
  });

const {loadEnvFile} = require('process')
loadEnvFile('../.env')

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))

app.use(session({
    cookie:{
        maxAge: 60*60*24*7,
        httpOnly: true
    },
    saveUninitialized: false,
    path: '/',
    secret: process.env.SESSION_SECRET,
    store
}))

app.post('/course/add', async (req, res) => {
    const {name, description, code, teachingMode} = req.body
    try {
         const course = await AddCourse(name, description, code, teachingMode)
         res.status(201).json(course)
    } catch (err) {
         res.status(400).json({ error: err.message })
    }
})

app.delete('/course/remove', async (req, res) => {
    const { name, code } = req.body
    try {
        const course = await RemoveCourse(name, code,req)
        res.status(200).json(course)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

app.post('/course/:courseId/upvote', async (req, res) => {
    const userId = req.session.user.ID
    const { courseId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const result = await UpvoteCourse(courseId, userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/course/:id/reviews/add', async (req, res) => {
    const courseId = req.params.id
    const { reviewerId, reviewText } = req.body
    try 
    {
        const review = await AddCourseReview(reviewerId, courseId, reviewText)
        res.status(201).json(review)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete('/course/reviews/:reviewId/remove', async (req, res) => {
    try {
        const currentUserID = req.session.user.ID
        const currentUser = await GetUserById(currentUserID)
        const deleted = await RemoveCourseReview(req.params.reviewId, currentUser)
        res.status(200).json(deleted)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

app.post('/review/upvote/:reviewId', async (req, res) => {
    const userId = req.session?.user.ID;
    const { reviewId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const result = await UpvoteReview(reviewId, userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/user/register', async (req, res) => {

    const { username, password, role } = req.body;

    try {
        const user = await RegisterUser(username, password, role);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await LoginUser(req, username, password);
        req.session.user = {
            ID: result.userID
        }
        req.session.save(()=>{})
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

app.post('/user/logout', async (req, res) => {
   req.session.destroy()
   res.status(200).json({message: 'Logout successful'})
});

app.get('/courses', async (req, res) => {
    try {
        const result = await GetAllCourses();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

app.get('/courses/:id', async (req, res) => {
    try {
        const courseID = req.params.id;
        const result = await GetCourseById(courseID);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

app.listen((process.env.NODE_SERVER_PORT), async() => {
    await connectToMongoDatabase()
    console.log('server is listening on port:', process.env.NODE_SERVER_PORT)
})