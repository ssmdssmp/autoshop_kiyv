import FilterItem from "./FilterItem";
import CarSelect from "../carSelect";
import "./filters.scss";
import { useSelector, useDispatch } from "react-redux";
import { handleClearFilters } from "./filtersSlice";
import { useEffect, useState } from "react";
import { handleOpenFilters, handleActiveProducer } from "./filtersSlice";
import SelectedFilters from "./SelectedFilters";
import Select from "react-select";
import { filterItems } from "../MainList/mainListSlice";

const Filters = () => {
  const [selectProducers, setSelectProducers] = useState([]);
  const [posFilters, setPosFilters] = useState(0);
  const selectedFilters = useSelector(({ filters }) => filters.selectedFilters);
  const filters = useSelector(({ filters }) => filters.filters);
  const producers = useSelector(({ filters }) => filters.producers);
  const dispatch = useDispatch();

  const customStyles = {
    control: (provided, state) => ({
      // ...provided,
      ...provided,
      border: state.isFocused
        ? "1px solid #36AC0D"
        : "1px solid rgba(0, 0, 0, 0.166)",
      display: "flex",
      boxShadow: state.isFocused ? "0px 0px 1px #36AC0D " : "none",
      borderRadius: "4px",
      height: "30px",
      "&:hover": {
        borderColor: "#36AC0D",
      },
    }),
    input: (provided, input) => ({
      ...provided,

      margin: "0",
      padding: "0",
    }),
    container: (provided, state) => ({
      ...provided,

      width: window.innerWidth < 1000 ? "25vw" : "160px",
      transition: "width 0.3s ease-in-out",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: "flex",
      color: "rgba(0,0,0,0.3)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#35ac0d4b"
        : state.isSelected
        ? "white"
        : "white",
      color: "black",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  useEffect(() => {
    const arr = [];
    producers.map((item) => {
      return arr.push({ label: item, value: item });
    });
    setSelectProducers(arr);
  }, [producers]);
  return (
    <div className="filters">
      {window.innerWidth < 1000 && <SelectedFilters />}
      <CarSelect />
      <ul
        className="filters-list"
        ref={(ref) => {
          if (!ref) {
            return;
          }
          setPosFilters(ref.getBoundingClientRect().left);
        }}
      >
        {filters.map((item, i) => {
          return (
            <FilterItem
              posFilters={posFilters}
              key={i}
              filter={item.title}
              id={i}
            />
          );
        })}
      </ul>
      <div className="filters-buttons-wrapper">
        <div className="select-producers">
          <p>Вибір за виробником:</p>
          <Select
            placeholder="Виробник"
            styles={customStyles}
            options={selectProducers}
            onChange={(opt) => {
              dispatch(handleActiveProducer(opt.value));
            }}
          />
        </div>
        <div className="filters-buttons">
          {window.innerWidth > 1000 && <SelectedFilters />}

          <button onClick={() => dispatch(handleClearFilters())}>
            Видалити фільтри
          </button>
          <button
            className="select-filters-button"
            onClick={() => dispatch(handleOpenFilters())}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
