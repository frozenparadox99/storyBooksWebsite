const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');


require('./config/passport')(passport);

const auth=require('./routes/auth');

const app=express();


app.get('/',(req,res)=>{
    res.send('HI');
});

app.use('/auth',auth);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});