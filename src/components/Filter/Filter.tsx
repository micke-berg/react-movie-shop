import React from "react";
import "./Filter.styles.scss";

function Filter(props: any, filterProducts: any) {
  return (
    <div className='filter'>
      <div className='filter-result'> {props.count} Movies</div>
      <div className='filter-sort'>
        {/* Order{" "}
        <select value={props.size} onChange={props.sortProducts}>
          <option value=''>Latest</option>
          <option value='Lowest'>Lowest</option>
          <option value='Highest'>Highest</option>
        </select> */}
      </div>
      <div className='filter-sort'>
        Filter{" "}
        <select value={props.price} onChange={filterProducts}>
          <option value=''>All</option>
          {/* {category.map((category: any, i: number) => (
            <option value={category.id}>{category.name}</option>
          ))} */}
          <option value=''>Action</option>
          <option value=''>Thriller</option>
          <option value=''>Comedy</option>
          <option value=''>Sci-fi</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
