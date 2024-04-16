// import { useNavigate } from ss"react-router-dom";
import Header from "../Components/Header";
import Products from "../Components/Products";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Products/>
        </div>
    );
};

export default Home;
