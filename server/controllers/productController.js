const colors = require("colors");
const Products = require("../models/products");

exports.addproduct = async (req, res) => {
    console.log(req.files);
    try {
        const { productname, category, price, location } = req.body;
        const images = req.files?.map((file) => file.filename);
        console.log(images);

        const newProduct = new Products({ productname, category, price, location, images });
        await newProduct.save();
        console.log("Product added successfully".bold.yellow);
        res.status(200).json({ status: true });
    } catch (error) {
        console.log("error =>", error);
        res.status(500).json({ error });
    }
};

exports.get_products = async (req, res) => {
    try {
        const products = await Products.find();
        // console.log(products);
        res.status(200).json({ products });
    } catch (error) {
        console.log("server error =", error);
    }
};

exports.get_product_detail = async (req, res) => {
    console.log(req.query);
    try {
        const { productId } = req.query;
        const product = await Products.findOne({ _id: productId });
        console.log(product);
        res.status(200).json({ product });
    } catch (error) {}
};
