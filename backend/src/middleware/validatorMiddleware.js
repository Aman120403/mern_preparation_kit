import {validationResult} from "express-validator";
import {ApiError} from "../utils/ApiError.js";

const validate = (req, res, next) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }

    const ExtractedErrors = [];

    errors.array().map((err)=> 
        ExtractedErrors.push({
            [err.path]:err.msg,
        }),
    );
    throw next( new ApiError(422, "Received data is not valid", ExtractedErrors));

};
export {validate};