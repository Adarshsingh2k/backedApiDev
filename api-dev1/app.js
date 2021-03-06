const express= require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');


const productRoutes=require('./api/routes/product');
const orderRoutes=require('./api/routes/order');

mongoose.connect('mongodb://localhost:27017/cars',{useNewUrlParser: true});
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"it works!!"
//     })
// })
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS Error Removal
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Request-With, Contnet-Type,Accept, Authorization');
    if(req.method==='OPTIONS'){
    res.header('Access-Control-Allow-Headers','PUT,POST,PATCH,DELETE');
    return res.status(200).json({});
    }
    next();
})

app.use('/product',productRoutes);
app.use('/order',orderRoutes);


app.use((req,res,next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports=app