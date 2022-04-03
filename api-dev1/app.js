const express= require('express');
const app = express();
const bodyParser= require('body-parser');

const productRoutes=require('./api/routes/product');
const orderRoutes=require('./api/routes/order');

// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"it works!!"
//     })
// })
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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