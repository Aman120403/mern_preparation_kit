import {Router} from "express";

import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";

import { userLoginValidator, userRegisterValidator } from "../validators/validator.js";
import { validate } from "../middleware/validatorMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

//Public routes

router.post("/register", userRegisterValidator,validate, registerUser);

router.post("/login", userLoginValidator, validate, loginUser);


//Secured/Protected routes
router.get("/currentuser", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);


export default router;
