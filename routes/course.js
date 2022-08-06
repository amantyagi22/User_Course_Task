const router = require("express").Router();
const Course = require("../models/Course");
// Add Course
router.post("/add", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.status(200).json({
      message: "Course Added Successfully",
      id: course._id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Course not registered successfully", err: err });
  }
});
// View a course by Id
router.get("/view/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});
// View all Users enrolled in the Course
router.get("/users/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course.usersEnrolled);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});
// View all Courses
router.get("/all", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err });
  }
});
module.exports = router;
