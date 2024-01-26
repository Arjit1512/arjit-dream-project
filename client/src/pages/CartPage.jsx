import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CartPage = () => {
    const location = useLocation();
    const { state } = location;
    const [selectedItem, setSelectedItem] = useState(null);
    const cartItems = state?.cartItems || [];

    const userId = "65b1424434fc72ea29abd1ca";

    const handleImageClick = async (index, event) => {
        event.preventDefault();
        console.log('Clicked index:', index);

        try {
            const response = await axios.post(`http://localhost:3001/add-to-cart/${userId}`, {
                productId: index + 1,
                quantity: 1,
            });

            console.log('Response:', response.data);
            // Optionally, you can fetch the updated cart after adding the item
            fetchUserCart();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // Handle error or show an error message to the user
        }
    };

    useEffect(() => {
        // Fetch user's cart when the component mounts
        fetchUserCart();
    }, []);

    const fetchUserCart = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/get-cart/${userId}`);
            console.log('User Cart:', response.data.cart);
            // Update the UI with the user's cart if needed
            // For example, you can set the cartItems state to response.data.cart
        } catch (error) {
            console.error('Error fetching user cart:', error);
            // Handle error or show an error message to the user
        }
    };

    return (
        <div className="cart-page-main">
    
            <div className="cart-items sale1">
                {cartItems.map((item, index) => (
                    <div
                        key={index}
                        className="cart-item flex-row sale1"
                        onClick={(event) => handleImageClick(index, event)}
                    >
                        <img src={`../sources/pro${index + 1}.webp`} alt={`Product ${index + 1}`} />
                        <div className="flex-col comp-of-items">
                            <h2>Interior & Exterior<br />
                                Painting</h2>
                            <p>Set the mood with a fresh coat of paint.</p>
                            <h3>899.00</h3>
                        </div>
                    </div>
                ))}
            </div>
    
            {selectedItem && (
                <div>
                    <h2>Selected Item</h2>
                    <img src={selectedItem} alt="Selected Product" />
                </div>
            )}
        </div>
    );
    

}
export default CartPage;