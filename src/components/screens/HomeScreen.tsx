import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import axios from "axios";
import { SEARCH_BASE_URL, API_URL, CATEGORIES_URL } from "../../config";

import ICartItem from "../../Interfaces/ICartItem";
import IOrder from "../../Interfaces/IOrder";
import IProduct from "../../Interfaces/IProduct";
import IMovie from "../../Interfaces/IMovie";
import ICategories from "../../Interfaces/ICategories";
import ISearchTerm from "../../Interfaces/ISearchTerm";

import Cart from "../../components/Cart/Cart";
import Products from "../../components/Products/Products";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsResult, setProductsResult] = useState<IMovie[]>([]);
  const [moviesResult, setMoviesResult] = useState<IMovie[]>([]);
  const [categoriesResult, setCategoriesResult] = useState<ICategories[]>([]);
  const [showProducts, setShowProducts] = useState<IMovie[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  async function getMovies(searchTerm: string) {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}`
      : `${API_URL}/products`;

    const result = await axios.get(endpoint);
    setProductsResult(result.data);
    setShowProducts(result.data);

    return result;
  }

  useEffect(() => {
    getMovies(searchTerm);
  }, [searchTerm]);

  async function getCategories() {
    const result = await axios.get(CATEGORIES_URL);
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

  const resetCartItems = () => {
    setCartItems([]);
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
              resetCartItems={resetCartItems}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeScreen;
