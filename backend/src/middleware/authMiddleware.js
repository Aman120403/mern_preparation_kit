import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"
import {ApiError} from "../utils/ApiError.js"

export const verifyJWT = async(req,res,next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");
        console.log("Cookies:", req.cookies);

        if(!token){
            throw new ApiError(401, "Unauthorized - Please login first");
   
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )
        //console.log(user);

        if(!user){
            throw new ApiError(401, "Invalid access Token")
        }
        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "Invalid access token"
        )
    }
}