import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import bulbImg from "../../../assets/img/bulb.svg";
import { handleActiveFilter, handleActiveSubFilter } from "../filtersSlice";
import { filterItems, resetCurrentPage } from "../../MainList/mainListSlice";
const FilterItem = ({ filter, id, posFilters }) => {
  const [marginActiveFilter, setMarginActiveFilter] = useState(0);
  const [isFilterItemTransitionOver, setIsFilterItemTransitionOver] =
    useState(false);
  const [marginSubFilters, setMarginSubFilters] = useState(0);
  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const subFilters = useSelector(
    (state) => state.filters.filters[id].subFilters
  );
  const activeSubfilter = useSelector((state) => state.filters.activeSubfilter);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (activeFilter.includes(filter)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [activeFilter]);
  const dispatch = useDispatch();

  return (
    <li
      ref={(ref) => {
        if (!ref) {
          return;
        }
        ref.addEventListener("transitionend", () => {
          setIsFilterItemTransitionOver(true);
          setMarginSubFilters(-ref.getBoundingClientRect().left + posFilters);
        });
      }}
      style={
        active
          ? {
              marginBottom: `${Math.round(marginActiveFilter)}px`,
              transitionDelay: "0s",
            }
          : { marginBottom: "0px", transitionDelay: " 0.3s" }
      }
      className={active ? "filters-list-item active" : "filters-list-item"}
    >
      <div
        onClick={() => {
          dispatch(handleActiveFilter(filter));
          dispatch(filterItems(selectedFilters));
          setIsFilterItemTransitionOver(false);
          dispatch(resetCurrentPage());
        }}
        className="filters-list-item-content"
      >
        <img src={bulbImg} alt="" />
        <p>{filter}</p>
      </div>

      <div
        ref={(refSubFilters) => {
          if (!refSubFilters) {
            return;
          }

          setMarginActiveFilter(
            refSubFilters.getBoundingClientRect().height + 20
          );
        }}
        style={{
          left: `${marginSubFilters}px`,
          top: "60px",
          visibility: active ? "initial" : "hidden",
          opacity: isFilterItemTransitionOver ? 1 : 0,
        }}
        className="sub_filters"
      >
        <ul className="sub_filters-list">
          {subFilters.map((item) => {
            return (
              <li
                key={nanoid()}
                onClick={() => {
                  dispatch(handleActiveSubFilter(item));
                }}
                className="sub_filters-list-item"
                style={{
                  color: activeSubfilter === item ? "white" : "rgba(0,0,0,0.7)",

                  backgroundColor:
                    activeSubfilter === item ? "#36AC0D" : "#fff",
                  boxShadow:
                    activeSubfilter === item
                      ? "1px 1px 2px #36AC0D"
                      : "0px 0px 0px #36AC0D",
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};
export default FilterItem;
