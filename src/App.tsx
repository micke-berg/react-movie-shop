import React, { useState, useEffect } from "react";

import axios from "axios";
import { IMovie } from "./Interfaces/IMovie";
import { ICartItems } from "./Interfaces/ICartItems";
import { ICategories } from "./Interfaces/ICategories";

import Cart from "./components/Cart/Cart";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";

const App: React.FC = () => {
  const [productsResult, setProductsResult] = useState<IMovie[]>([]);
  const [categoriesResult, setCategoriesResult] = useState<ICategories[]>([]);
  const [movie, setMovie] = useState();

  useEffect(() => {
    axios
      .get<IMovie[]>(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
      )
      .then((res) => {
        setProductsResult(res.data);
        setShowProducts(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<ICategories[]>(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/categories"
      )
      .then((res) => {
        console.log(res.data);
        setCategoriesResult(res.data);
      });
  }, []);

  const [showProducts, setShowProducts] = useState<IMovie[]>([]);
  const [cartItems, setCartItems] = useState<IMovie[]>([]);

  const temp = [];

  const addToCart = (product: IMovie) => {
    const updatedCartItems = cartItems;

    updatedCartItems.push(product);

    setCartItems(updatedCartItems);

    // let alreadyInCart: boolean = false;

    // cartItems.forEach((item: any) => {
    //   if (item.id == product.id) {
    //     item.count++;
    //     alreadyInCart = true;
    //   }
    // });
    // if (!alreadyInCart) {
    //   cartItems.push({ ...product, count: 1 });
    // }
    // setCartItems({ cartItems });
  };

  const filterCategory = (event: React.ChangeEvent<HTMLSelectElement>): any => {
    console.log(event.target.value);

    if (event.target.value === "") {
      setShowProducts(productsResult);
    } else {
      const filterProducts = productsResult.filter((product) => {
        let filterProducts: IMovie[] = [];

        productsResult.map((product) => {
          product.productCategory.map((pC) => {
            if (pC.categoryId === parseInt(event.target.value)) {
              filterProducts.push(product);
              console.log(filterProducts);
            }
          });
        });
        setShowProducts(filterProducts);
      });
    }
  };

  return (
    <div className='grid-container'>
      <header className='App-header'>
        <a href='/'>React Movie Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
              filterCategory={filterCategory}
              count={showProducts.length}
              category={categoriesResult}
            />
            <Products products={showProducts} addToCart={addToCart} />
          </div>
          <div className='sidebar'>
            <Cart cartItems={cartItems} />
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
