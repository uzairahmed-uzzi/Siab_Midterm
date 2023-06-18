const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const Book=require('../models/bookSchema');
const jwtAuthorization = require('../middlewares/jwtMiddleware');

exports.addBook=asyncHandler(async(req,res)=>{
    const {name_edition,publisher,publishDate,description,category}=await req.body;
    if(!name_edition||!publisher||!publishDate||!description||!category){
        res.status(400).send("All fields are mandatory");
    }else{
        if(await Book.findOne({"name_edition":name_edition})){
            res.status(400).send("Book already exist");
        }else{
            
            const book=await Book.create({
                name_edition,publisher,publishDate,description,category
            });
            // console.log(book);
            res.status(201).json({message:"Book Added Successfully",data:book});
        }
    }
});
exports.getAllBooks=asyncHandler(async(req,res)=>{
        const books=await Book.find();
        if(!books){
            res.status(404).send("No Book exists");
        }
        else{
            // console.log(books);
            res.status(200).json({message:"Books Retrieved Successfully",books});
        }
});
exports.getBookById=asyncHandler(async(req,res)=>{
    if(req.params.id)
    {const books=await Book.findById(req.params.id);
    if(!books){
        res.status(404).send("Book doesn't exist");
    }
    else{
        res.status(200).json({message:"Book Retrieved Successfully",data:books});
    }
    }
    else{
        res.status(400).send("Id is mandatory");
    }
});
exports.updateBook=asyncHandler(async(req,res)=>{
    const {id}=req.body.old;
    if(!id){
        res.status(400).send("Id is mandatory");
    }else{
        const books=await Book.findById(id);
    if(!books){
        res.status(404).send("Book doesn't exist");
    }else{
        
        if(await Book.findOne({"name_edition":req.body.old.name_edition})){
            res.status(400).send("Book already exist with this name and edition");
        }else{
        let updatedBook;  
        
         updatedBook=await Book.findByIdAndUpdate(id,{...req.body.old},{new:true});
    
    if(updatedBook){
       res.status(201).json({message:"Book Updated Successfully",updatedBook});
    }else{
        res.status(500).send("Something Went Wrong");
    }
    }
    }
}

});

exports.deleteBook=asyncHandler(async(req,res)=>{

    if(!req.params.id){
        res.status(400).send("ID IS MANDATORY");
    }
    else{
        if(! await Book.findById(req.params.id)){
            res.status(404).send("BOOK DOESN'T EXIST");
        }else{
            const deletedBook=await Book.findByIdAndDelete(req.params.id);
            res.status(204).json({"title":"Deleted Successfully",deletedBook});
        }
    }
});