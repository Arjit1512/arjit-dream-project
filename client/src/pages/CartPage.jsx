// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../App.css';

// const CartPage = () => {
//     const location = useLocation();
//     const { state } = location;
//     const [selectedItem, setSelectedItem] = useState(null);

//     const cartItems = state?.cartItems || [];

//     const handleImageClick = (index, event) => {
//         event.preventDefault();
//         console.log('Clicked index:', index);
//         console.log('Cart items:', cartItems);
//         setSelectedItem(cartItems[index]);
//     };



//     return (
//         <div className="cart-page-main">
//             <h1>Your Cart</h1>
//             <div className="border-maroon maroon1"></div>

//             <div className="space"></div>

//             <div className="flex-col">
//                 <div className="cart-items sale1">
//                     {cartItems.map((item, index) => (
//                         <div
//                             key={index}
//                             className="cart-item flex-row sale1"
//                             onClick={(event) => handleImageClick(index, event)}
//                         >
//                             <img src={`../sources/pro${index + 1}.webp`} alt={`Product ${index + 1}`} />
//                             <div className="flex-col comp-of-items">
//                                 <h2>Interior & Exterior<br />
//                                     Painting</h2>
//                                 <p>Set the mood with a fresh coat of paint.</p>
//                                 <h3>899.00</h3>
//                             </div>
//                         </div>
//                     ))}


//                 </div>
//             </div>

//             {selectedItem && (
//                 <div>
//                     <h2>Selected Item</h2>
//                     <img src={selectedItem} alt="Selected Product" />
//                     {/* Add more details about the selected product if needed */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CartPage = () => {
    const location = useLocation();
    const { state } = location;
    const [selectedItem, setSelectedItem] = useState(null);
    const userId = 1;
    const cartItems = state?.cartItems || [];

    const handleImageClick = async (index, event) => {
        event.preventDefault();
        console.log('Clicked index:', index);

        try {
            
            
            const response = await axios.post(`http://localhost:3001/add-to-cart/${userId}`, {
                productId: index + 1,  // Assuming your product IDs start from 1
                quantity: 1,  // You may adjust the quantity based on your requirements
            });

            console.log('Response:', response.data);
            // Optionally, you can fetch the updated cart after adding the item
            // to reflect the changes in the UI
            // fetchUserCart();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // Handle error or show an error message to the user
        }
    };
        // ... (previous code)

        useEffect(() => {
            // Fetch user's cart when the component mounts
            fetchUserCart();
        }, []);
    
        const fetchUserCart = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/get-cart/${userId}`);
                console.log('User Cart:', response.data.cart);
                // Update the UI with the user's cart if needed
            } catch (error) {
                console.error('Error fetching user cart:', error);
                // Handle error or show an error message to the user
            }
        };
    
        // ... (rest of the component)
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
    
    // ... rest of the component

}
export default CartPage;