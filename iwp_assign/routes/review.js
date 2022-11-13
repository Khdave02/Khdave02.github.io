const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../models/product');

createReview =  (req, res) => {
    
    const product =  Product.findById('6370bd268a27ab29dcde2ff9');
    console.log(product.reviews);
    product.reviews.push(req.body.review);

    product.save();
    res.redirect(`/products/${product._id}`);
}

// deleteReview =  (req, res) => {
//     const { id, reviewId } = req.params;
//     Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/products/${id}`);
// }

router.post('/',  createReview)

// router.delete('/:reviewId',  deleteReview);


module.exports = router;