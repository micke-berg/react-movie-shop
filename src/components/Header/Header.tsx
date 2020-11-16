import React, { useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import "./Header.style.scss";

import SearchBar from "../SearchBar/SearchBar";

import searchIcon from "../../images/search-icon.svg";
interface CategoryData {
  id: number;
  name: string;
}

interface Props {
  count: number;
  category: CategoryData[];
  filterCategory(event: React.ChangeEvent<HTMLSelectElement>): void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = ({
  count,
  category,
  filterCategory,
  searchTerm,
  setSearchTerm,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <header className='header-wrapper'>
      <div className='links'>
        <Link to='/'>
          <h2>
            <span className='main-color'>Movie</span> Shop
            <span className='main-color'>.</span>
          </h2>
        </Link>
      </div>
      <div className='header-content'>
        <div className='header-filter-row'>
          <div className='filter-result'> {count} Movies</div>
          <Filter onChange={filterCategory} category={category} />
        </div>
      </div>
      <div className='header-searchbar'>
        {!isHidden && (
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
      </div>
      <button
        className='btn-search-icon'
        type='button'
        onClick={toggleIsHidden}>
        <img className='search-icon' src={searchIcon} alt='Search icon' />
      </button>
    </header>
  );
};

export default Header;
