const express= require('express');
const router= express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "order get access"
    })

})

router.post('/',(req,res,next)=>{
    const order ={
        productId: req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message:'order was created',
        orderDe: order
    })
})

router.get('/:orderId',(req,res,next)=>{
    const id=req.params.orderId;
    res.status(200).json({
        message:'particular order creater',
        id: id
    })
})

module.exports=router;