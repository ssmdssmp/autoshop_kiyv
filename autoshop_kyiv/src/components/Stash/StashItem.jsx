import xImg from "../../assets/img/x.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleStashItems, handleCounter, deleteStashItem } from "./StashSlice";
const StashItem = ({ settings, counter, orderStashItem }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderStashItem) {
      console.log(orderStashItem);
    }
  }, []);
  // const handleCounter = (type) => {
  //   if (typeof counter !== "number") {
  //     return;
  //   }
  //   if (type === "inc") {
  //     if (pcs > 99) {
  //       return;
  //     } else {
  //       setPcs(pcs + 1);
  //     }
  //   }
  //   if (type === "dec") {
  //     if (pcs < 2) {
  //       return;
  //     } else {
  //       setPcs(pcs - 1);
  //     }
  //   }
  // };
  return (
    <li className="stash-item">
      <img className="stash-item-img" src={settings.thumbnail} alt="" />
      <div className="stash-item-title">{settings.title}</div>
      {orderStashItem ? (
        <p className="order-stash-item-counter" style={{ width: "80px" }}>
          {counter} шт.
        </p>
      ) : (
        <div className="counter">
          <button
            onClick={() => {
              // handleCounter("dec");
              dispatch(
                handleCounter({ id: settings.id, counter: counter - 1 })
              );
            }}
          >
            -
          </button>
          <input
            // defaultValue={counter}
            value={counter}
            onChange={(e) => {
              dispatch(
                handleCounter({ id: settings.id, counter: e.target.value })
              );
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onBlur={() => {
              if (counter > 100) {
                // counter = 99;
              } else {
                return;
              }
            }}
            type="text"
          />
          <button
            onClick={() =>
              dispatch(handleCounter({ id: settings.id, counter: counter + 1 }))
            }
          >
            +
          </button>
        </div>
      )}
      <div className="stash-item-price">{+settings.price * counter} грн.</div>
      <img
        onClick={() => dispatch(deleteStashItem(settings))}
        className="stash-item-delete"
        src={xImg}
        alt=""
      />
    </li>
  );
};
export default StashItem;
