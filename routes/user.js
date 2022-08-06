const router = require("express").Router();
const Course = require("../models/Course");
const User = require("../models/User");
// Add User
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json({
      message: "User successfully registered",
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "User already exist", err: err });
  }
});

// View a single User using id
router.get("/view/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// View all users
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});

// Enroll in the course
router.put("/enroll", async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await Course.findById(courseId);
    const currDate = new Date();
    if (currDate >= course.startDate) {
      throw "Course has started";
    }
    const userUpdate = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { coursesEnrolled: courseId } }
    );
    const courseUpdate = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { usersEnrolled: userId } }
    );
    res.status(200).json({
      message: "Successfully Enrolled in the course",
    });
  } catch (err) {
    res.status(500).json({
      message: "User can't enroll after starting of the course",
      err: err,
    });
  }
});

// View all enrolled Courses by user
router.get("/courses/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.coursesEnrolled);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});
module.exports = router;
