import "./mainList.scss";
import MainItem from "./MainItem";
import SelectedFilters from "../Filters/SelectedFilters";
import Select from "react-select";
import { useEffect, useState } from "react";
import { filterItems, setCurrentPage } from "./mainListSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sortItems } from "./mainListSlice";
import { sortImg } from "../../assets/img/filter.svg";

const MainList = () => {
  const [offset, setOffset] = useState(0);
  const currentPage = useSelector((state) => state.items.currentPage);
  const pages = useSelector((state) => state.items.pages);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);

  const sortedData = useSelector((state) => state.items.sortedData);
  useEffect(() => {
    dispatch(filterItems(selectedFilters));
  }, [selectedFilters]);
  const sortingOptionsArr = [
    { label: "Алфавітний порядок", value: "alphabet" },
    { label: "Найпопулярніші", value: "popular" },
    { label: "Від дешевих до дорогих", value: "cheap" },
    { label: "Від дорогих до дешевих", value: "expensive" },
  ];
  useEffect(() => {
    setOffset(currentPage * 24);
  }, [currentPage]);

  const pageList = () => {
    if (currentPage < 7) {
      return [1, 2, 3, 4, 5, 6, 7, "...", pages];
    } else {
      return [
        1,
        "..",
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        pages,
      ];
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="main_list">
      <div className="main_list-sort">
        <div className="main_list-sort-filters">
          <p>Активні фільтри:</p>
          {window.innerWidth > 1000 && <SelectedFilters />}
        </div>

        <div className="main_list-sort-sorting">
          <Select
            options={sortingOptionsArr}
            placeholder="Сортувати"
            isSearchable={false}
            onChange={(opt) => {
              console.log(opt.value);
              dispatch(sortItems(opt.value));
            }}
          />
        </div>
      </div>
      {window.innerWidth < 1000 && <SelectedFilters />}
      <ul>
        {sortedData.length > 24
          ? sortedData.slice(offset, offset + 24).map((item, i) => {
              return <MainItem settings={item} key={i} />;
            })
          : sortedData.map((item, i) => {
              return <MainItem settings={item} key={i} />;
            })}
      </ul>
      <div className="main_list-pages">
        <ul className="pages">
          {pageList().map((item, i) => {
            return (
              <li
                style={
                  currentPage === item
                    ? { backgroundColor: "#36AC0D", color: "white" }
                    : null
                }
                onClick={() => {
                  dispatch(setCurrentPage(item));
                }}
                key={i}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainList;
