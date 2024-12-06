import { User } from "../Models/user.model.js";
import { CustomError } from "../utills/customError.js";


const sendLoginToken = (user, statusCode, res) => {
  const accessToken = user.createLoginToken();

  res.status(statusCode).json({
    success: true,
    accessToken,
    userData: {
      fullName: user.fullName,
      emailAddress: user.emailAddress,
    },
  });
};

export const registerNewUser = async (req, res, next) => {
  try {
    const { fullName, emailAddress, userPassword } = req.body;

    // Check user is already exists or not
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return next(
        new CustomError(
          "This email is already registered. Please try logging in instead.",
          400
        )
      );
    }

    //create user in db
    const newUser = await User.create({
      fullName,
      emailAddress,
      userPassword,
    });

    // Send token
    sendLoginToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { emailAddress, userPassword } = req.body;

    if (!emailAddress || !userPassword) {
      return next(
        new CustomError("Please provide both email and password", 400)
      );
    }

    // Find user by email and include password for verification
    const existingUser = await User.findOne({ emailAddress }).select(
      "+userPassword"
    );
    if (!existingUser) {
      return next(new CustomError("Invalid email or password", 401));
    }

    // Verify password
    const isPasswordValid = await existingUser.isPasswordCorrect(userPassword);
    if (!isPasswordValid) {
      return next(new CustomError("Invalid email or password", 401));
    }

    // Update last login date
    existingUser.lastLoginDate = new Date();
    await existingUser.save();

    // Send login token
    sendLoginToken(existingUser, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    res.status(200).json({
      success: true,
      userData: {
        fullName: currentUser.fullName,
        emailAddress: currentUser.emailAddress,
        accountCreatedAt: currentUser.accountCreatedAt,
        lastLoginDate: currentUser.lastLoginDate,
      },
    });
  } catch (error) {
    next(error);
  }
};
