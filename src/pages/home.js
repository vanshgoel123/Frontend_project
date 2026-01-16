import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./home.css";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout Successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8000/products";
      const headers = {
        Authorization: localStorage.getItem("jwtToken"),
      };
      const response = await fetch(url, { method: "GET", headers });
      const result = await response.json();
      console.log(result);
      setProducts(result.products);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Products</h1>
        <div>
          <span className="welcome-user">Welcome, {loggedInUser}!</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="products-container">
        {products &&
          products?.map((item, index) => (
            <ul key={index} className="product-card">
              <li className="product-item">
                <strong>ID:</strong> {item.id}
              </li>
              <li className="product-item">
                <strong>Name:</strong> {item.name}
              </li>
              <li className="product-item">
                <strong>Price:</strong> Rs.{item.price}
              </li>
              <li className="product-item">
                <strong>Description:</strong> {item.description}
              </li>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}
export default Home;
