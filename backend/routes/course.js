const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel, userModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const user = await userModel.findById(userId);
  const course = await courseModel.findById(courseId);

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  const ifPurchased = await purchaseModel.findOne({
    userId,
    courseId,
  });

  if (ifPurchased) {
    return res.status(403).json({
      error: "You have already purchased this course",
    });
  }

  if (user.balance < course.price) {
    return res.status(403).json({
      error: "Insufficient balance",
    });
  }

  user.balance -= course.price;

  user.save();

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

courseRouter.get("/:courseId", userMiddleware, async function (req, res) {
  const courseId = req.params.courseId;

  const ifPurchased = await purchaseModel.findOne({
    userId: req.userId,
    courseId,
  });

  if (!ifPurchased) {
    return res.status(403).json({
      error: "You have not purchased this course or course not found",
    });
  }

  const course = await courseModel.findById(courseId).populate("creatorId");

  res.json({
    course,
  });
});

courseRouter.get("/all/preview", async function (req, res) {
  const courses = await courseModel
    .find({})
    .select("-courseContent")
    .populate("creatorId");

  return res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
