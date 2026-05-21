const asyncHandler = (requestHandler) =>{
   
    return(req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>{console.log("asyncHandler registered for:", requestHandler.name);next(err)});
    };
};

export {asyncHandler};  