import React, { useState } from "react";
import Products from "./components/Products/Products";
import data from "./data.json";

function App() {
  const [state, setState] = useState({
    products: data.products,
  });
  return (
    <div className='grid-container'>
      <header>
        <a href='/'>React Movie Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            Products
            <Products products={state.products} />
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
}

export default App;
