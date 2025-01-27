const mongoose = require('mongoose');
const dbConnect=()=>{
    try{
        const conn= mongoose.connect("mongodb+srv://lalitsharma63786:kamal123@cluster0.vywzosx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("db connected");
    }
    catch(error){
        console.log("fb err");
    }
}
module.exports=dbConnect;
//(process.env.MONGODB_URL)