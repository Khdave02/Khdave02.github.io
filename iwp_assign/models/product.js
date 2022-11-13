const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	
	body:String,
	title: String,
	image: String,    //we can use for image as ...."{type: String, default: defaultimage.jpg}".
	reviews: [
        {
            body:String,
            rating:Number,
        }
        ],
	created: {type: Date, default: Date.now,},
});

module.exports = mongoose.model('Product', ProductSchema);