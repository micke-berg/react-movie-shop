import React, { useState, useEffect } from "react";

import axios from "axios";
import { SEARCH_BASE_URL, API_URL, CATEGORIES_URL } from "./config";

import { IMovie } from "./Interfaces/IMovie";
import { ICartItem } from "./Interfaces/ICartItem";
import { ICategories } from "./Interfaces/ICategories";
import { IOrder } from "./Interfaces/IOrder";
import { IProduct } from "./Interfaces/IProduct";
import { ISearchTerm } from "./Interfaces/ISearsTerm";

import Cart from "./components/Cart/Cart";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsResult, setProductsResult] = useState<IMovie[]>([]);
  const [moviesResult, setMoviesResult] = useState<IMovie[]>([]);
  const [categoriesResult, setCategoriesResult] = useState<ICategories[]>([]);
  const [showProducts, setShowProducts] = useState<IMovie[]>([]);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  async function getMovies(searchTerm: string) {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}`
      : `${API_URL}/products`;

    const result = await axios.get(endpoint);
    // console.log("get movies result", result.data);
    setProductsResult(result.data);
    setShowProducts(result.data);

    return result;
  }

  useEffect(() => {
    getMovies(searchTerm);
  }, [searchTerm]);

  async function getCategories() {
    const result = await axios.get(CATEGORIES_URL);
    console.log("get categories result", result.data);
    setCategoriesResult(result.data);

    return result;
  }

  useEffect(() => {
    getCategories();
  }, []);

  const addToCart = (product: IMovie) => {
    const updatedCart = cartItems;
    let alreadyAddedIndex = -1;

    if (updatedCart.length > 0) {
      updatedCart.map((cartItem, index) => {
        if (cartItem.movie.id === product.id) {
          alreadyAddedIndex = index;
        }
      });
    }
    if (alreadyAddedIndex === -1) {
      const newItem = {
        movie: product,
        quantity: 1,
      };
      updatedCart.push(newItem);
    } else {
      updatedCart[alreadyAddedIndex].quantity++;
    }
    // console.log("add to cart movie", product);
    // console.log("add to cart updated", updatedCart);

    setCartItems([...updatedCart]);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFromCart = (cartItem: ICartItem) => {
    const updatedCart = cartItems;

    updatedCart.map((item, index) => {
      if (item === cartItem) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          updatedCart.splice(index, 1);
        }
      }
    });

    setCartItems([...updatedCart]);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const createOrder = (order: IOrder) => {
    alert("Need to save order for" + order.name);
  };

  const filterCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
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

  useEffect(() => {
    if (isFirstLoad) {
      let loadedCart = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") || "{}")
        : [];
      setIsFirstLoad(false);
      setCartItems(loadedCart);
    }
  }, []);

  useEffect(() => {
    setProductCount(showProducts.length);
  }, [showProducts]);

  // console.log("productCount", productCount);
  // console.log("showProducts", showProducts);
  // console.log("cartItems", cartItems);

  return (
    <div className='grid-container'>
      <Header
        filterCategory={filterCategory}
        count={productCount}
        category={categoriesResult}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>
        <div className='content'>
          <Products products={showProducts} addToCart={addToCart} />
          <div className='sidebar'>
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
