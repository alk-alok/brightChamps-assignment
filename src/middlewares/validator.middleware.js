import { body, validationResult } from "express-validator";

export const validateInput = (validationType) => {
  switch (validationType) {
    case "registration": {
      return [
        body("fullName")
          .trim()
          .notEmpty()
          .withMessage("Please tell us your name")
          .isLength({ min: 2 })
          .withMessage("Name must be at least 2 characters long")
          .escape(),

        body("emailAddress")
          .trim()
          .notEmpty()
          .withMessage("Please provide your email address")
          .isEmail()
          .withMessage("Please provide a valid email address")
          .normalizeEmail(),

        body("userPassword")
          .trim()
          .notEmpty()
          .withMessage("Please create a password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),

        (req, res, next) => {
          const validationErrors = validationResult(req);
          if (!validationErrors.isEmpty()) {
            return res.status(400).json({
              success: false,
              errors: validationErrors.array().map((err) => ({
                field: err.param,
                message: err.msg,
              })),
            });
          }
          next();
        },
      ];
    }

    case "login": {
      return [
        body("emailAddress")
          .trim()
          .notEmpty()
          .withMessage("Please provide your email address")
          .isEmail()
          .withMessage("Please provide a valid email address")
          .normalizeEmail(),

        body("userPassword")
          .trim()
          .notEmpty()
          .withMessage("Please enter your password"),

        (req, res, next) => {
          const validationErrors = validationResult(req);
          if (!validationErrors.isEmpty()) {
            return res.status(400).json({
              success: false,
              errors: validationErrors.array().map((err) => ({
                field: err.param,
                message: err.msg,
              })),
            });
          }
          next();
        },
      ];
    }
  }
};
