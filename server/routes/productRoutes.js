const express = require("express");
const { addproduct, get_products, get_product_detail } = require("../controllers/productController");
const {upload} = require('../utils/s3bucket')
const router = express.Router();
router.get('/products',get_products)
router.post("/addproduct",upload.array('images'), addproduct);
router.get('/productdetail',get_product_detail)

module.exports = router;
