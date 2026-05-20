import { body } from "express-validator";

const userRegisterValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .matches(/^[a-z0-9]+$/)
        .withMessage("Username must be in lowercase")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be atleast 3 characters long"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
];

const userLoginValidator = [
     body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),    
];

export { userRegisterValidator, userLoginValidator };