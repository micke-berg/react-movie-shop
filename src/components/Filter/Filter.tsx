import React from "react";
import { IMovie } from "../../Interfaces/IMovie";
import { ICategories } from "../../Interfaces/ICategories";
import "./Filter.styles.scss";

interface CategoryData {
  id: number;
  name: string;
}
interface Props {
  category: CategoryData[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const Filter: React.FC<Props> = ({ category, onChange }) => {
  return (
    <div className='filter-wrapper'>
      <div className='filter'>
        {/* <div className='filter-result'> {count} Movies</div> */}
        <div className='filter-sort'>
          Filter by category{" "}
          <select onChange={onChange}>
            <option value=''>All</option>
            {category.map((category: any, i: number) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
