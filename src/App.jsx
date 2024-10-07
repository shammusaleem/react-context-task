import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <ProductList /> {/* Cart is handled inside ProductList, no need to render again */}
      </div>
    </CartProvider>
  );
}

export default App;
