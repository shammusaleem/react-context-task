
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import products from '../assets/products.json'; // Import product data

const ProductList = () => {
  const { addToCart, cartItems, totalAmount, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="container">
      {/* Left side: Product list */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Right side: Cart summary */}
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            {/* Subtotal, shipping, and total */}
            <div className="price-summary">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="price-row total-row">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;