import Filters from "../Filters";
import { nanoid } from "@reduxjs/toolkit";
import "./search.scss";
import burgerImg from "../../assets/img/bars.svg";
import searchImg from "../../assets/img/search.svg";
import { useSelector, useDispatch } from "react-redux";
import { handleOpenFilters } from "../Filters/filtersSlice";
import {
  handleSearchByName,
  handleSearchByIndex,
} from "../MainList/mainListSlice";
import SearchItem from "./SearchItem";
const Search = () => {
  const searchByNameInput = useSelector(({ items }) => items.searchByNameInput);
  const searchByIndexInput = useSelector(
    ({ items }) => items.searchByIndexInput
  );
  const isOpenFilters = useSelector(({ filters }) => filters.isOpenFilters);
  const foundData = useSelector(({ items }) => items.foundData);
  const dispatch = useDispatch();
  return (
    <div
      className="search"
      style={
        isOpenFilters
          ? {
              border: "1px solid rgba(0,0,0,0.2) ",
            }
          : {
              border: "none",
              borderTop: "1px solid rgba(0,0,0,0.2) ",
            }
      }
    >
      <div
        className="search-default"
        style={{ borderRadius: isOpenFilters ? "0" : "4px" }}
      >
        <button
          onClick={() => dispatch(handleOpenFilters())}
          className="search-filters"
          style={{ borderBottomLeftRadius: isOpenFilters ? "0px" : "4px" }}
        >
          Фільтри <img src={burgerImg} alt="" />
        </button>
        <input
          value={searchByNameInput}
          onChange={(e) => {
            dispatch(handleSearchByName(e.target.value));
            console.log(foundData.slice(0, 5));
          }}
          placeholder="Пошук за назвою"
          className="search-word"
          type="text"
        />

        <input
          value={searchByIndexInput}
          onChange={(e) => dispatch(handleSearchByIndex(e.target.value))}
          placeholder="Пошук за артикулом"
          className="search-num"
          type="text"
        />
        <button
          onClick={() => isOpenFilters && dispatch(handleOpenFilters())}
          style={{ borderBottomRightRadius: isOpenFilters ? "0" : "4px" }}
          className="search-btn"
        >
          Пошук <img src={searchImg} alt="" />{" "}
        </button>
        {(searchByIndexInput.length !== 0 ||
          searchByNameInput.length !== 0) && (
          <div className="search-list">
            {foundData.slice(0, 5).map((item) => {
              return <SearchItem key={nanoid()} settings={item} />;
            })}
          </div>
        )}
      </div>
      {isOpenFilters && (
        <div className="filters-wrapper">
          <Filters />
        </div>
      )}
    </div>
  );
};
export default Search;
