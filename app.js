const express=require('express');
const mongoose=require('mongoose');

const app=express();


app.get('/',(req,res)=>{
    res.send('HI');
});

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});