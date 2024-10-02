const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

const adminSignup = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

const adminLognin = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
});

const courseSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500),
  imageUrl: z.string().url(),
  price: z.number(),
  courseContent: z.string(),
});

adminRouter.get("/me", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const admin = await adminModel
    .findOne({
      _id: adminId,
    })
    .select("-password");

  return res.status(200).json({
    admin,
  });
});

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  const validation = adminSignup.safeParse({
    email,
    password,
    firstName,
    lastName,
  });

  if (!validation.success) {
    return res.status(403).json({
      error: "something wrong with your inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    return res.json({
      message: "User already exists",
    });
  }

  return res.json({
    message: "Signup succeeded",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const validation = adminLognin.safeParse({
    email,
    password,
  });

  if (!validation.success) {
    return res.status(403).json({
      error: "something wrong with your inputs",
    });
  }

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  const token = jwt.sign(
    {
      id: admin._id,
    },
    JWT_ADMIN_PASSWORD
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
  });

  return res.json({
    message: "Login succeeded",
  });
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, courseContent } = req.body;

  const price = parseInt(req.body.price);

  console.log(title, description, imageUrl, price, courseContent);

  const validation = courseSchema.safeParse({
    title,
    description,
    imageUrl,
    price,
    courseContent,
  });

  if (!validation.success) {
    return res.status(403).json({
      error: "something wrong with your inputs",
    });
  }

  // creating a web3 saas in 6 hours
  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
    courseContent: courseContent,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.post("/preview/:courseId", adminMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const adminId = req.adminId;

  const course = await courseModel.findOne({
    _id: courseId,
    creatorId: adminId,
  });

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  return res.json({
    course,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price, courseId, courseContent } =
    req.body;

  const validation = courseSchema.safeParse({
    title,
    description,
    imageUrl,
    price,
    courseContent,
  });

  if (!validation.success) {
    return res.status(403).json({
      error: "something wrong with your inputs",
    });
  }

  try {
    const course = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        courseContent: courseContent,
      }
    );

    if (course.modifiedCount === 0) {
      return res.status(403).json({
        error: "Course not found",
      });
    }

    return res.json({
      message: "Course updated",
      courseId: course._id,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Course not found",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  return res.json({
    courses,
  });
});

adminRouter.get("/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.status(200).json({
    message: "Logged out successfully",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
