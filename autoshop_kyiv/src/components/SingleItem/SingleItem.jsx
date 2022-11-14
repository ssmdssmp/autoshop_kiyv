import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import xImg from "../../assets/img/x.svg";
import directionImg from "../../assets/img/direction.svg";
import shopImg from "../../assets/img/shop_icon.svg";
import { useEffect, useState } from "react";
import "./singleItem.scss";
import { handleStashItems, handleOpenStash } from "../Stash/StashSlice";
import {
  handleActiveProducer,
  handleActiveFilter,
  handleActiveSubFilter,
  handleActiveCar,
} from "../Filters/filtersSlice";
import { nanoid } from "@reduxjs/toolkit";
const SingleItem = ({ id }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [prevItemId, setPrevItemId] = useState("/");
  const [nextItemId, setNextItemId] = useState("/");
  const selectedFilters = useSelector(({ filters }) => filters.selectedFilters);
  const filteredData = useSelector((state) => state.items.filteredData);
  const currentItem = useSelector((state) =>
    state.items.itemsList.filter((el) => el.id === id)
  );
  const stashItems = useSelector(({ stash }) => stash.stashItems);
  useEffect(() => {
    if (filteredData.length > 1) {
      const index = filteredData.indexOf(
        filteredData.filter((item) => item.id === currentItem[0].id)[0]
      );
      if (index > 0 && index < filteredData.length) {
        const prevItemId = filteredData[index - 1].id;
        setPrevItemId(prevItemId);
        const nextItemId = filteredData[index + 1].id;
        setNextItemId(nextItemId);
      }
      setCounter(1);
    }
  }, [id, filteredData]);

  const handleCounter = (type) => {
    if (typeof counter !== "number") {
      return;
    }
    if (type === "inc") {
      if (counter > 99) {
        return;
      } else {
        setCounter(counter + 1);
      }
    }
    if (type === "dec") {
      if (counter < 2) {
        return;
      } else {
        setCounter(counter - 1);
      }
    }
  };
  return (
    <div className="single_item">
      <div className="single_item-content-wrapper">
        <Link to="/" className="back-arrow-link">
          <img className="back-arrow" src={xImg} alt="" />
        </Link>
        <div className="single_item-content-container">
          <Link to={`/${prevItemId}`}>
            <img className="direction" src={directionImg} alt="" />
          </Link>
          {currentItem.map((item) => {
            return (
              <div key={nanoid()} className="single_item-content">
                <img src={item.thumbnail} alt="" />
                <div className="single_item-text">
                  <h2>{item.title}</h2>

                  <div className="single_item-categories">
                    <p>Артикул: {item.tradeIndex}</p>
                    <p>
                      Виробник:{" "}
                      <span
                        style={
                          selectedFilters.producer === item.producer
                            ? {
                                border: "none",
                                backgroundColor: "#36AC0D",
                                color: "white",
                              }
                            : null
                        }
                        onClick={() =>
                          dispatch(handleActiveProducer(item.producer))
                        }
                      >
                        {item.producer}
                      </span>
                    </p>
                    <p>
                      Категорія:{" "}
                      <span
                        onClick={() =>
                          dispatch(handleActiveFilter(item.filter))
                        }
                        style={
                          selectedFilters.filter === item.filter
                            ? {
                                border: "none",
                                backgroundColor: "#36AC0D",
                                color: "white",
                              }
                            : null
                        }
                      >
                        {item.filter}
                      </span>
                    </p>
                    <p>
                      Фільтр:
                      <span
                        onClick={() =>
                          dispatch(handleActiveSubFilter(item.subfilter))
                        }
                        style={
                          selectedFilters.subfilter === item.subfilter
                            ? {
                                border: "none",
                                backgroundColor: "#36AC0D",
                                color: "white",
                              }
                            : null
                        }
                      >
                        {item.subfilter}
                      </span>
                    </p>
                  </div>
                  <div className="single-item-cars">
                    <div className="single_item-cars-brand">
                      Сумісність:{" "}
                      <span
                        style={
                          selectedFilters.brand === item.cars.brand
                            ? {
                                border: "none",
                                backgroundColor: "#36AC0D",
                                color: "white",
                              }
                            : null
                        }
                        onClick={() =>
                          dispatch(
                            handleActiveCar({
                              category: "brand",
                              value: item.cars.brand,
                            })
                          )
                        }
                      >
                        {item.cars.brand}
                      </span>
                    </div>
                    <div className="single_item-cars-models">
                      <p>Моделі:</p>
                      <ul>
                        {item.cars.models.map((item) => {
                          return (
                            <li
                              key={nanoid()}
                              style={
                                selectedFilters.model === item.model
                                  ? {
                                      border: "none",
                                      backgroundColor: "#36AC0D",
                                      color: "white",
                                    }
                                  : null
                              }
                              onClick={() =>
                                dispatch(
                                  handleActiveCar({
                                    category: "model",
                                    value: item.model,
                                  })
                                )
                              }
                            >
                              {item.model}
                            </li>
                          );
                        })}
                      </ul>
                      <hr />
                    </div>
                  </div>

                  <div className="single_item-price">
                    {stashItems.filter((el) => el.obj.id === id).length !==
                    0 ? (
                      <button
                        className="single_item-price-btn"
                        style={{
                          background: "none",
                          border: "1px solid #36AC0D",
                          color: "#36AC0D",
                        }}
                        onClick={() => {
                          dispatch(handleOpenStash());
                        }}
                      >
                        <img
                          style={{
                            filter:
                              "invert(42%) sepia(23%) saturate(1352%) hue-rotate(87deg) brightness(100%) contrast(40%)",
                          }}
                          src={shopImg}
                          alt=""
                        />{" "}
                        У кошику
                      </button>
                    ) : (
                      <button
                        className="single_item-price-btn"
                        onClick={() => {
                          dispatch(
                            handleStashItems({
                              counter: counter,
                              obj: currentItem[0],
                            })
                          );
                          dispatch(handleOpenStash());
                        }}
                      >
                        <img src={shopImg} alt="" /> Додати у кошик
                      </button>
                    )}

                    <div className="counter">
                      <button onClick={() => handleCounter("dec")}>-</button>
                      <input
                        value={counter}
                        onChange={(e) => {
                          setCounter(+e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onBlur={() => {
                          if (counter > 100) {
                            setCounter(100);
                          } else {
                            return;
                          }
                        }}
                        type="text"
                      />
                      <button onClick={() => handleCounter("inc")}>+</button>
                    </div>
                    <h2>{+item.price * counter} грн.</h2>
                  </div>
                </div>
              </div>
            );
          })}
          <Link to={`/${nextItemId}`}>
            <img className="direction next" src={directionImg} alt="" />
          </Link>
        </div>
      </div>
      {/* {currentItem.length !== 0 ? (
        <SimilarItems subfilter={currentItem[0].subfilter} />
      ) : null} */}
    </div>
  );
};
export default SingleItem;
