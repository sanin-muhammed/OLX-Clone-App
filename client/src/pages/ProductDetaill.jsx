import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { getProductDetails } from "../Actions/action";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetaill = () => {
    const location = useLocation();
    const productId = new URLSearchParams(location.search).get("productId");
    console.log({ productId });
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await getProductDetails(productId);
            console.log({ response });
            if (response.product) {
                setProduct(response.product);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const settings = {
        // dots: true,  
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // appendDots: (dots) => (
        //     <div>
        //         <ul className="custom-dots">{dots}</ul>
        //     </div>
        // ),
    };

    return (
        <>
            <Header />
            <div className="productdetail_container">
                {product && (
                    <div className="productdetail">
                        <div className="img_div">
                            <Slider {...settings} initialSlide={currentImageIndex}>
                                {product.images.map((image, index) => (
                                    <div className="main_img" key={index}>
                                        <img src={`http://localhost:2001/${image}`} alt={`image_${index}`} />
                                    </div>
                                ))}
                            </Slider>
                            <div className="sub_imgs">
                                {product.images.map((image, index) => (
                                    <img src={`http://localhost:2001/${image}`} alt={`image_${index}`} key={index} onClick={() => setCurrentImageIndex(index)} />
                                ))}
                            </div>
                        </div>
                        <div className="detail_div">
                            <h1>₹ {product.price}</h1>
                            <h3>{product.productname}</h3>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetaill;
