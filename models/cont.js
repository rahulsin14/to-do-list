const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    }
});
const Task=mongoose.model('Task',schema);
module.exports=Task;