require('dotenv').config({path:'.env.local'})
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI)

const userSchema = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance:Number

})

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountSchema)
module.exports={User,Account}