//FRAMEWORK and MODULES INCLUDING
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
// const reviewRoutes = require('./routes/review')

//INITIALIZATIONS

var app = express();
//CONNECT TO APP AND D.B.4
const dbUrl = process.env.DB_URL || "mongodb://localhost/restful_blog_app";
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//SOME  IMPORTENT SET UP....(APP CONFIG)
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //Only we need to include express-sanitizer after the body-parser. 
app.use(express.static("public"));
app.use(methodOverride("_method"));
// app.use('/products/:id/reviews', reviewRoutes)

//MONGOOSE SCHEMA SET UP....(MONGOOSE/MODEL CONFIG)
const Product = require("./models/product");

//RESTful  ROOT ROUTES

app.get("/",(req,res)=>{
	res.redirect("/products");
});


//INDEX ROUTE
app.get("/products",(req,res)=>{
	Product.find({},(err,products)=>{
		if(err){
			console.log(`ERROR!!!! ${err}`);
		}else{
			res.render("index",{products: products });
		}
	});
});
//NEW ROUTE
app.get("/products/new",(req,res)=>{
	res.render("new");
});
//CREATE ROUTE
app.post("/products",(req,res)=>{
	//To sanitizing the post centent field
	req.body.product.body = req.sanitize(req.body.product.body);
	//create blog 
	Product.create(req.body.product,(err,newProduct)=>{
		if(err){
			res.render("new");
		}else{
			//then, redirect to the index
			res.redirect("/products");
		}
	});
	
});
//SHOW ROUTE
app.get("/products/:id",function(req,res){
	Product.findById(req.params.id,(err,foundProduct)=>{
		if(err){
			res.redirect("/products");
		}else{
			res.render("show",{product: foundProduct});
		}
	});
});

app.post("/products/:id/reviews", function (req, res) {
    
    Product.findById(req.params.id,(err,product)=>{
		if(err){
			res.redirect("/products")
		}
		else{
			console.log(product);
			product.reviews.push(req.body.review);

            product.save();
            res.redirect(`/products/${product._id}`);
		}
	});
    
})
//EDIT ROUTE
app.get("/products/:id/edit",(req,res)=>{
	Product.findById(req.params.id,(err,foundProduct)=>{
		if(err){
			res.redirect("/products ");
		}else{
			res.render("edit",{product: foundProduct});
		}
	});
});
//UPDATE ROUTE
app.put("/products /:id",(req,res)=>{
	//To sanitizing the post centent field
	req.body.product.body = req.sanitize(req.body.product.body);
	Product.findByIdAndUpdate(req.params.id,req.body.product,(err,updatedProduct)=>{
		if(err){
			res.redirect("/products");
		}else{
			res.redirect("/products/" + req.params.id);
		}
	});
});
//DELETE ROUTE
app.delete("/products/:id",(req,res)=>{
	//Destroy post
	Blog.findByIdAndRemove(req.params.id,(err,removeProduct)=>{
		if(err){
			res.redirect("/products");
		}else{
			//redirect home
			res.redirect("/products");
		}
	});
});
//TO START EXPRESS APP
app.listen(3000,()=>{
	console.log(`RESTful Blog App server is started in port 3000`);
});

/*//This may require for testing.
Blog.create({
	title: "Test Blog",
	image: "https://farm8.staticflickr.com/7368/9811937955_03d073d6ef.jpg",
	body: "HELLO THIS IS A BLOG POST."
});*/
