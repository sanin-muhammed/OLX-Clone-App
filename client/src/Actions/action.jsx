import axios from "../Services/axiosConfig";

export const post_signup = async (formData) => {
    try {
        const response = await axios.post("/api/signup", formData);
        console.log("Response from backend:",response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};

export const post_login = async (formData) => {
    try {
        const response = await axios.post("/api/login", formData);

        console.log("Response from backend:",response);
        if(response.data.Token){
            console.log('Token set successfully');
            localStorage.setItem('token', response.data.Token);
        }
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};



export const verify_otp = async (otpData) => {
    try {
        const response = await axios.post("/api/verify-otp", otpData);
        console.log("Response from backend:",response);
        if(response.data.Token){
            console.log('Token set successfully');
            localStorage.setItem('token', response.data.Token);
        }
        return response.data;
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
    }
};

export const addproduct = async (formData)=>{
    try {
        const response = await axios.post('/api/addproduct',formData,{
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
          })
        console.log("Response from backend:",response);
        return response.data;
        
    } catch (error) {
        console.error("Error:", error.response.data);
        return error.response.data;
        
    }
}

export const get_products =async ()=>{
    try {
        const response = await axios.get('/api/products')
        console.log("Response from backend:",response);
        return response.data;

    } catch (error) {
        console.log(error);
        
    }
}
export const getProductDetails =async (productId)=>{
    try {
        const response = await axios.get(`/api/productdetail?productId=${productId}`)
        console.log("Response from backend:",response);
        return response.data;

    } catch (error) {
        console.log(error);
        
    }
}