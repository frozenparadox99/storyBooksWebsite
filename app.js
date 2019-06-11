const express=require('express');
const path=require('path');
const exphbs  = require('express-handlebars');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const session = require('express-session')
const passport=require('passport');

require('./models/User');
require('./models/Story');

require('./config/passport')(passport);

const index=require('./routes/index');
const auth=require('./routes/auth');
const stories=require('./routes/stories');

const keys=require('./config/keys');

mongoose.Promise=global.Promise;
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
.then(()=>{
    console.log('MongoDB connected ....')
})
.catch(err=>console.log(err));

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');



app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))

app.use(passport.initialize());
  app.use(passport.session());

  app.use((req,res,next)=>{
    res.locals.user= req.user || null;
    next();
  });

  app.use(express.static(path.join(__dirname,'public')));

  app.use('/',index);
  app.use('/auth',auth);
  app.use('/stories',stories);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});