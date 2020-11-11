import { type } from "os";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";
import data from "./data.json";

const App: React.FC = () => {
  // const productsData = data.products;
  // const products = [...productsData];

  // const categoriesData = data.categories;
  // const categories = [...categoriesData];

  const [state, setState] = useState({
    products: data.products,
    count: 0,
  });

  // const sortProducts = (event: any) => {
  //   const sort = event.target.value;

  //   console.log(event.target.value);
  //   setState((state) => ({
  //     sort: sort,
  //     products: state.products.slice((a, b) =>
  //       sort === "lowest"
  //         ? a.price > b.price
  //           ? 1
  //           : -1
  //         : sort === "highest"
  //         ? a.price > b.price
  //           ? 1
  //           : -1
  //         : a._id > b._id
  //         ? 1
  //         : -1
  //     ),
  //   }));
  // };

  const filterProducts = (event: any) => {
    console.log(event.target.value);

    // if (event.target.value === "") {
    //   setState({ price: event.target.value, product: data.products });
    // } else {
    //   setState({
    //     price: event.target.value,
    //     products: data.products.filter(
    //       (product) => product.availableSizes.indexOf(event.target.value) >= 0
    //     ),
    //   });
    // }
  };

  return (
    <div className='grid-container'>
      <header className='App-header'>
        <a href='/'>React Movie Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter filterProducts={filterProducts} count={state.count} />
            <Products products={state.products} />
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
