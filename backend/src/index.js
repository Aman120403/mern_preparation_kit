import "dotenv/config";
import app from "./app.js";


import connectDB from './db/index.js';

const PORT =  process.env.PORT || 8000;
connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`App is running on PORT http://localhost:${PORT}`)
});
})
.catch((err)=>{
    console.error("MongoDB connection failed");
    process.exit(1);
});
