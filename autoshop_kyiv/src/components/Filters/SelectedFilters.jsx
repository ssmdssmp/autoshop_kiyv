import { nanoid } from "@reduxjs/toolkit";
import xImg from "../../assets/img/x.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedFilter } from "./filtersSlice";
import { filterItems } from "../MainList/mainListSlice";
const SelectedFilters = () => {
  const dispatch = useDispatch();
  const selectedFiltersArr = useSelector(
    (state) => state.filters.selectedFilters
  );

  return (
    <div className="filters-active">
      <ul className="filters-active-list">
        {Object.entries(selectedFiltersArr).map((item) => {
          if (item[1] !== "") {
            return (
              <li
                key={nanoid()}
                onClick={() => {
                  dispatch(deleteSelectedFilter(item[0]));
                  dispatch(filterItems(selectedFiltersArr));
                }}
                className="filters-active-list-item"
              >
                <p>{item[1]}</p>
                <img src={xImg} alt="" />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default SelectedFilters;
