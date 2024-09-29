const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt");
const z = require("zod");

const userSignup = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

const userLognin = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
});

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation

  const validation = userSignup.safeParse({
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
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (error) {
    return res.status(401).json({
      error: "user already exists.",
    });
  }

  return res.json({
    message: "Signup succeeded",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const validation = userLognin.safeParse({
    email,
    password,
  });

  if (!validation.success) {
    return res.status(403).json({
      error: "something wrong with your inputs",
    });
  }

  const user = await userModel.findOne({
    email: email,
  });

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(403).json({
        message: "Incorrect password",
      });
  } else {
    return res.status(403).json({
      message: "Incorrect email",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_USER_PASSWORD
  );

  console.log(token);

  res.cookie("token", token, {
    sameSite: "none",
    secure: true,
  });

  res.status(201).json({
    message: "Logged in successfully",
    token,
  });
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  let purchasedCourseIds = [];

  for (let i = 0; i < purchases.length; i++) {
    purchasedCourseIds.push(purchases[i].courseId);
  }

  const coursesData = await courseModel.find({
    _id: { $in: purchasedCourseIds },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = {
  userRouter: userRouter,
};
