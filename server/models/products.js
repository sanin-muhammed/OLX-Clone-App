const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        require:true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
});

const Products = mongoose.model("products", productSchema);
// export Products collection
module.exports = Products;