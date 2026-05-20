import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {  
        username:{
            type:String,
            required:[true, "Username is required"],
            unique:true,
            lowercase:true,
            trim:true,
            minlength: [3,  "Name must be at least 3 characters"],
            maxlength: [20, "Name must be less than 20 characters"],
            index:true,
            
        },
        refreshToken:{
    type:String
},
        email:{
            type:String,
            required:[true, "Email is required"],
            trim:true,
            unique:true,
            lowercase:true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email"
            ]
        },
        fullName:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            required:[true, "Password is required"],
            minLength: 6,
            maxLength: 20
        },
        emailVerificationToken:{
            type: String
        },
        emailVerificationExpiry:{
            type: Date
        }

    },{
        timestamps: true
    },
)

// =====================
// HASH PASSWORD BEFORE SAVE
// =====================

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return
        this.password = await bcrypt.hash(this.password, 10)
        return;
})

// =====================
// COMPARE PASSWORD METHOD
// =====================

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

// =====================
// GENERATE ACCESS TOKEN
// =====================

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// =====================
// GENERATE REFRESH TOKEN
// =====================
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model("User", userSchema)