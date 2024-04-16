import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { get_products } from "../Actions/action";

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const handleProductDetail = (productId) => {
        navigate(`/productdetail?productId=${productId}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await get_products();
                if (response.products) {
                    console.log("products = ", response.products);
                    setProducts(response.products);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="products_container">
            <div className="products">
                {products.map((product, index) => (
                    <div className="product_box" key={index} onClick={() => handleProductDetail(product._id)}>
                        <img src={`http://localhost:2001/${product.images[0]}`} alt="image" />
                        <div className="box_body">
                            <h2>₹ 21000</h2>
                            <p className="productname">{product.productname}</p>
                            <p className="location">{product.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
