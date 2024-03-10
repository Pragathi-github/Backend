//index.js
const express = require('express')
const mongoose = require('mongoose')
const port = 8000

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://pastehere/')
.then(()=>{
    console.log("Database Connected!")
})
.catch((error)=>{
    console.log(error)
})

let authorSchema = new mongoose.Schema({
    name : { type : String },
    email : { type : String },
    publishedDate : { type : Date } 
}
)
let authorModel = new mongoose.model('Author', authorSchema)


let blogSchema = new mongoose.Schema({
    title : { type : String },
    blogContent : { type : String },
    authorName : { type : String }
}
)
let blogModel = new mongoose.model('Blog', blogSchema)

let createAuthor = async function(req, res){
    let data = req.body 
    let result = await authorModel.create(data);
    res.status(200).json({ msg : "Author Created", data : result })
}
let getAuthor = async function(req, res){
    let data1 = await authorModel.find();
    res.status(200).json({ msg : "Author Details", data : data1})
}

let createBlog = async function(req, res){
    let data = req.body
    let result = await blogModel.create(data);
    res.status(200).json({ msg : "Blog Created", data : result })
}
let getBlog = async function(req, res){
    let data1 = await blogModel.find();
    res.status(200).json({ msg : "Blog Details", data : data1})
}

app.post('/create-author', createAuthor);
app.get('/getdata-author', getAuthor);
app.post('/create-blog', createBlog);
app.get('/getdata-blog', getBlog);

app.listen(port, ()=>{
    console.log(Server running at ${port});
})
