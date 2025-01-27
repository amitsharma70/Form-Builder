const express= require("express");
const dbConnect = require("./config/db");
const app=express();
const env= require("dotenv");
env.config();
const PORT =process.env.PORT|| 4000;
const cookieparser=require("cookie-parser");
const cors = require('cors');

app.use(cookieparser());
const authRoute = require('./routes/authRoutes');
const productRoute=require('./routes/productroutes');
const couponRoute=require('./routes/couponRoutes')
const verifyRoutes = require('./routes/verifyRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paymentRoute = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const offerRoutes = require('./routes/offerRoutes');
const formRoutes = require('./routes/formRoutes');


const bodyParser = require('body-parser');

const errorHandler = require("./middleware/errorhandler");
const corsOptions = {
    origin: 'http://localhost:3000  ',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
app.use(cors(corsOptions));

dbConnect();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/api/user',authRoute);
app.use('/api/coupon',couponRoute);
app.use('/api/product',productRoute);
app.use('/api/otp', verifyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payment',paymentRoute);
app.use('/api/order', orderRoutes);
app.use('/api/shipment',shipmentRoutes);
app.use('/api/offer',offerRoutes);
app.use('/api/form',formRoutes);

app.use(errorHandler); 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})