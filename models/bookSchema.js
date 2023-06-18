const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    name_edition:{
        type:String,
        required:true,
        unique:[true,"Book already exist"],
    },
    publisher:{
        type:String,
        required:true,
    },
    publishDate:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
});
module.exports=mongoose.model('book',bookSchema);
