const express=require('express')
const router=require('./routes')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const session=require('express-session')
const connectDb=require('connect-mongodb-session')
const mongoDBSession = require('connect-mongodb-session')(session)
const app=express()
mongoose.connect('mongodb+srv://speediloveyou143:2LQTOvi94Z4qYE7H@cluster0.2vt6dzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('db connected...')
}).catch(()=>{
    console.log('something went wrong...')
})
const store=new mongoDBSession({
    uri:'mongodb+srv://speediloveyou143:2LQTOvi94Z4qYE7H@cluster0.2vt6dzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    collection:'sessions'
})
app.use(session({
    secret:'this is secret project',
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
app.listen(8000,()=>{
    console.log("server running......")
})
