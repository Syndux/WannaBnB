// backend/utils/validation.js
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = [];
    validationErrors.array().forEach((error) => errors.push(error.msg));

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .withMessage("Email or username is required"),
  check("password").exists({ checkFalsy: true }).withMessage("Password is required"),
  handleValidationErrors,
];

const validateSignup = [
  check("email").isEmail().withMessage("Invalid email"),
  check("username").exists({ checkFalsy: true }).withMessage("Username is required"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password").exists({ checkFalsy: true }).withMessage("Password is required"),
  handleValidationErrors,
];

const validateSpotBody = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country").exists({ checkFalsy: true }).withMessage("Country is required"),
  check("lat").exists({ checkFalsy: true }).withMessage("Latitude is not valid"),
  check("lng").exists({ checkFalsy: true }).withMessage("Longitude is not valid"),
  check("name").exists({ checkFalsy: true }).withMessage("Name is required"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReviewBody = [
  check("review", "Review text is required").exists({ checkFalsy: true }),
  check("stars", "Stars must be an integer from 1 to 5").isInt({ min: 1, max: 5 }),
  handleValidationErrors,
];

const validateBookingBody = [
  check("endDate", "endDate cannot be on or before startDate").custom(
    (value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      if (startDate >= endDate) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }
  ),
  handleValidationErrors,
];

const validateQueryParams = [
  check("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be an integer between 0 and 10"),
  check("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be an integer between 0 and 20"),
  check("minLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude must be a decimal number between -90 and 90"),
  check("maxLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude must be a decimal number between -90 and 90"),
  check("minLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude must be a decimal number between -180 and 180"),
  check("maxLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude must be a decimal number between -180 and 180"),
  check("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Minimum price must be a decimal number greater than or equal to 0"
    ),
  check("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Maximum price must be a decimal number greater than or equal to 0"
    ),
];

module.exports = {
  validateLogin,
  validateSignup,
  validateSpotBody,
  validateReviewBody,
  validateBookingBody,
  validateQueryParams,
};
