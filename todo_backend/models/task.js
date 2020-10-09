let mongoose=require('mongoose');
let newSchema={
    name:{
        type:String,
        required:true,
    },
   title:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        reduired:true
    },
    
}   
module.exports=Task=mongoose.model('task',newSchema);