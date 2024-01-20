import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

const CartPage = () => {
    const location = useLocation();
    const { state } = location;
    const [selectedItem, setSelectedItem] = useState(null);

    const cartItems = state?.cartItems || [];

    const handleImageClick = (index, event) => {
        event.preventDefault();
        console.log('Clicked index:', index);
        console.log('Cart items:', cartItems);
        setSelectedItem(cartItems[index]);
    };
    
    

    return (
        <div className="cart-page-main">
            <h1>Your Cart</h1>
            <div className="border-maroon maroon1"></div>

            <div className="space"></div>

            <div className="flex-col">
                <div className="cart-items sale1">
                {cartItems.map((item, index) => (
    <div
        key={index}
        className="cart-item flex-row sale1"
        onClick={(event) => handleImageClick(index, event)}
    >
        <img src={item} alt={`Product ${index + 1}`} />
        <div className="flex-col comp-of-items">
            <h2>Interior & Exterior<br />
                Painting</h2>
            <p>Set the mood with a fresh coat of paint.</p>
            <h3>899.00</h3>
        </div>
    </div>
))}


                </div>
            </div>

            {selectedItem && (
                <div>
                    <h2>Selected Item</h2>
                    <img src={selectedItem} alt="Selected Product" />
                    {/* Add more details about the selected product if needed */}
                </div>
            )}
        </div>
    );
};

export default CartPage;
