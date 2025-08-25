import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/home.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const productRes = await axios.get("https://crud-api-backend-72qv.onrender.com/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(productRes.data);

        const userRes = await axios.get("https://crud-api-backend-72qv.onrender.com/api/products/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const handleVerifyClick = () => {
    navigate("/verify-email");
  };

  return (
    <div className="home-container">
      {user && (
        <div className="user-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
          {!user.isVerified && (
            <button onClick={handleVerifyClick}>Verify Email</button>
          )}
        </div>
      )}

      <div className="products-section">
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="product-list">
            {products.map((p) => (
              <li key={p._id} className="product-card">
                <p><strong>ID:</strong> {p.id}</p>
                <p><strong>Name:</strong> {p.name}</p>
                <p><strong>Description:</strong> {p.description}</p>
                <p><strong>Price:</strong> ${p.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}