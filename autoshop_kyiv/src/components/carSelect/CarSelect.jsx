import {
  handleSelectedFilters,
  handleActiveCar,
} from "../Filters/filtersSlice";
import "./carSelect.scss";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

const CarSelect = () => {
  const dispatch = useDispatch();
  const activeCar = useSelector((state) => state.filters.activeCar);
  const carBrands = useSelector((state) => state.filters.carBrands);
  const carModels = useSelector((state) => state.filters.carModels);
  const carYears = useSelector((state) => state.filters.carYears);
  const [brandsArr, setBrandsArr] = useState([]);
  const [modelsArr, setModelsArr] = useState([]);
  const [yearsArr, setYearsArr] = useState([]);

  useEffect(() => {
    const arr = [];
    carBrands.map((item) => {
      arr.push({ label: item, value: item });
    });
    setBrandsArr(arr);
  }, []);
  useEffect(() => {
    const arr = [];
    carModels.map((item) => arr.push({ label: item, value: item }));
    setModelsArr(arr);
  }, [activeCar]);
  useEffect(() => {
    const arr = [];
    carYears.map((item) => arr.push({ label: item, value: item }));
    setYearsArr(arr);
  }, [activeCar]);

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
  return (
    <div className=" car_select">
      <div className="car_select-title">Вибір за авто</div>
      <ul className="car_select-list">
        <li>
          <Select
            styles={customStyles}
            options={brandsArr}
            placeholder={"Марка"}
            onChange={(opt) => {
              dispatch(
                handleActiveCar({ value: opt.value, category: "brand" })
              );
            }}
          />
        </li>
        <li>
          <Select
            options={activeCar.brand !== "" ? modelsArr : []}
            styles={customStyles}
            placeholder="Модель"
            onChange={(opt) => {
              dispatch(
                handleActiveCar({ value: opt.value, category: "model" })
              );
              console.log(opt);
            }}
          />
          {/* <input type="text" placeholder="Модель" /> */}
        </li>
        <li>
          <Select
            options={activeCar.model !== "" ? yearsArr : []}
            styles={customStyles}
            placeholder="Рік"
            onChange={(opt) => {
              dispatch(handleActiveCar({ value: opt.value, category: "year" }));
            }}
          />
          {/* <input type="text" placeholder="Рік" /> */}
        </li>
      </ul>
    </div>
  );
};
export default CarSelect;
