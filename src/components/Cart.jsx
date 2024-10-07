import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        cartItems.map((product) => (
          <div className="cart-item" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="cart-item-details">
              <h4 className="cart-item-title">{product.title}</h4>
              <div className="quantity-control">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <span className="quantity-display">{product.quantity}</span>
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>
            </div>
            <div className="cart-item-price">${product.price}</div>
            <button className="remove-button" onClick={() => removeItem(product.id)}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}

      <div className="cart-summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: FREE</p>
        <p>Total: ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
