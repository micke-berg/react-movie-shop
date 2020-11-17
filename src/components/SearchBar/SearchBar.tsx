import React, { useState, useEffect, useRef } from "react";

import "./SearchBar.style.scss";
// Image
import searchIcon from "../../images/search-icon.svg";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <div className='searchbar-wrapper'>
      <div className='searchbar-content'>
        <input
          type='text'
          placeholder='Search Movie...'
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </div>
    </div>
  );
};

export default SearchBar;
