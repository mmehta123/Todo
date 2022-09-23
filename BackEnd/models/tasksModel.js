const mongoose = require('mongoose');

const tasks= new mongoose.Schema({
    creator:{type:String},
    desc:{type:String},
    isDone:{type:Boolean,default:false}
},{timestamps:true,versionKey:false});

const TasksModel=mongoose.model('Tasks',tasks);

module.exports = TasksModel;