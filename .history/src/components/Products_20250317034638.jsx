import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { addToCart } = useContext(CartContext);

    // Fetch data
    const loadData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ marginTop: '30px' }}>
            <div className="sh-all-productAndSee-text-section">
                <div className="sh-all-productAndSee-text-container">
                    <h3>All Products</h3>
                    <a href="#">See More</a>
                </div>
            </div>
            <div className="sh-daimond-section">
                <div className="sh-daimond-product-container">
                    {loading ? (
                        <div className="loader-container">
                            <div className="spinner"></div>
                            <p>Loading, please wait...</p>
                        </div>
                    ) : (
                        data.map(item => (
                            <div key={item.id} className="sh-daimond-container">
                                <div className="sh-daimond-product">
                                    <Link to={`/single/${item.id}`}>
                                        <img src={item.image} alt={item.title} />
                                    </Link>
                                </div>
                                <div className="sh-product-discount-price">-38%</div>
                                <div className="sh-product-details">
                                    <div className="sh-product-name">
                                        <Link to={`/single/${item.id}`}>
                                            <h4>{item.title}</h4>
                                        </Link>
                                    </div>
                                    <div className="sh-products-prices">
                                        <div className="sh-less-price">
                                            <p>৳ {item.price}</p>
                                        </div>
                                        <div className="sh-regular-price">
                                            <p>৳ 2,500</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sh-order-korun-button">
                                    <button
                                        type="button"
                                        className="sh-btn-style sh-btn-cartbg"
                                        onClick={() => addToCart(item)}
                                    >
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                    <button type="button" className="sh-btn-style sh-btn-orderbg">
                                        <a href="/html/order-now.html">অর্ডার করুন</a>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
