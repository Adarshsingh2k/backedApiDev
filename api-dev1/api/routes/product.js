const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
 

const Product= require('../models/product');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:' get route for /products'
    })
})

router.post('/',(req,res,next)=>{

    // const product={
    //     name: req.body.name,
    //     price : req.body.price
    // }
    const product= new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price : req.body.price
    })
    product.save().then(result=>{
        console.log(result);
    }).catch(err=> console.log(err) );

    res.status(200).json({
        message:' post route for  /products',
        productDetail: product
    });
})
router.get('/:prodId',(req,res,next)=>{
    const id=req.params.prodId;
    if(id === 'special'){
        res.status(200).json({
            message: 'Special product',
            id: id
        })
    }
    else{
        res.status(200).json({
            message: 'product',
            id: id
        })
    }

       
})

module.exports=router;