import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { addproduct } from "../Actions/action";
import Header from "../Components/Header";
const AddProduct = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        productname: "",
        category: "",
        price: "",
        location: "",
        images: [],
    });

    // Function to handle file input change
    const handleFileChange = (e) => {
        setMessage("")
        const selectedImages = Array.from(e.target.files);
        console.log(e.target.value.length);
        console.log({ selectedImages });
        console.log(selectedImages.length);
        if(selectedImages.length>=5){
            setForm({ ...form, images: selectedImages });
        }else{
            setForm({ ...form, images: [] });
            setMessage("Atleast 5 images !")
        }

    };

    const handleChange = (e) => {
        setMessage("");
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // // Convert FormData to plain object
        // const convertedFormData = {};
        // formData.forEach((value, key) => {
        //     convertedFormData[key] = value;
        // });
        // console.log("convertedFormData = ", convertedFormData);
        const { productname, category, price, location, images } = form;
        console.log({ images });
        if (!productname) {
            setMessage("Enter Product Name");
            return;
        } else if (!category) {
            setMessage("Enter Category");
            return;
        } else if (!price) {
            setMessage("Enter Price");
            return;
        } else if (!location) {
            setMessage("Enter Location");
            return;
        } else if (images.length === 0) {
            setMessage("Choose Images");
            return;
        }
        // Send formData to your backend
        const formData = new FormData();
        formData.append("productname", productname);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("location", location);
        images.forEach((image)=>{
            formData.append("images", image);

        })
        const response = await addproduct(formData);
        console.log("response = ", response);
        if (response.message) {
            setMessage(response.message);
        }
        if (response.status) {
            navigate("/");
        }
    };
    return (
        <>
        <Header/>
            <div className="addProduct_container">
                <h2>POST YOUR AD</h2>
                <div className={message ? "alert" : "no_alert"}>{message}</div>
                <form className="" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label>Product Name</label>
                        <input type="text" name="productname" value={form.productname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Category</label>
                        <input type="text" name="category" value={form.category} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" name="location" value={form.location} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Images</label>
                        <div className="image_div">
                            <input type="file" name="images" multiple onChange={handleFileChange} />
                            <div className="preview_images">
                                {form.images.map((image, index) => (
                                    <img key={index} src={URL.createObjectURL(image)} alt={`preview-${index}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
