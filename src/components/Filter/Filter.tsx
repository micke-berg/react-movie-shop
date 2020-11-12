import React from "react";
import { IMovie } from "../../Interfaces/IMovie";
import { ICategories } from "../../Interfaces/ICategories";
import "./Filter.styles.scss";

interface IFilterProps {
  count: number;
  category: ICategories[];
  filterCategory(event: React.ChangeEvent<HTMLSelectElement>): any;
}

function Filter(props: IFilterProps): any {
  return (
    <div className='filter'>
      <div className='filter-result'> {props.count} Movies</div>
      <div className='filter-sort'></div>
      <div className='filter-sort'>
        Filter by category{" "}
        <select onChange={props.filterCategory}>
          <option value=''>All</option>
          {props.category.map((category: any, i: number) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
