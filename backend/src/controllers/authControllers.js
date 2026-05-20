import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  {asyncHandler}  from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(userId) =>{

        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken };

    
};

const registerUser = asyncHandler (async(req,res,next) =>{
    
    
        const {username, email, password} = req.body;

        const existedUser =  await User.findOne({$or:[{username},{email}]});

        if(existedUser){
            throw new ApiError(409, "User with email or username already exists", []);
        }

        const user = await User.create({
            username,
            email,
            password,
            isEmailVerified: false
        })
        

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering");
        }

        return res
        .status(201)
        .json(new ApiResponse(
            201,
            {user:createdUser},
            "User registered successfully"

            )
        )

    

});

const loginUser = asyncHandler(async (req, res, next) => {
    
        const { email, password } = req.body;

        if (!email) {
            throw new ApiError(400, "Email is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(400, "Password is invalid");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id)
            .select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User logged in successfully"
                )
            );
         
    
});

const logoutUser = asyncHandler(async (req,res,next) =>{
     // Step 1 - remove refresh token from database
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{refreshToken:1}
        },
        {
            new:true
        },
    );

    const  options = {
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "user logged out successfully"
            )
        )

});

const getCurrentUser = asyncHandler(async(req,res) =>{
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Curent User fetched successfully"
            )
        )
});

export {registerUser, loginUser,getCurrentUser, logoutUser}