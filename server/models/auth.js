import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type:String , require: true},
    password:{type:String},
    name: {type:String},
    desc:{type:String},
    attempt:{type:Number,max:5},
    blocked:{type:Boolean,default:false},
    joinedOn:{type:Date,default:Date.now}
})

export default mongoose.model("User",userSchema)