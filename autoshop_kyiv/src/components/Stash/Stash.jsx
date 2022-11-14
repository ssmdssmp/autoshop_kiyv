import shopImg from "../../assets/img/shop.svg";
import shopIcon from "../../assets/img/shop_icon.svg";
import { handleOpenStash } from "./StashSlice";
import { useSelector, useDispatch } from "react-redux";
import "./stash.scss";
import emptyStashImg from "../../assets/img/empty_box.svg";
import StashItem from "./StashItem";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
const Stash = () => {
  const dispatch = useDispatch();
  const isOpenStash = useSelector((state) => state.stash.isOpenStash);
  const stashItems = useSelector((state) => state.stash.stashItems);
  const calculateSum = () => {
    let sum = 0;
    stashItems.map((item) => {
      return (sum += item.obj.price * item.counter);
    });
    return sum;
  };
  return (
    <>
      <div className="stash-default ">
        <div
          onClick={() => {
            dispatch(handleOpenStash());
          }}
          className="  header-bottom-content stash"
        >
          <img src={shopImg} alt="" />
          <h2>
            Кошик
            {stashItems.length !== 0 ? (
              <span>
                {stashItems.length} поз.,{calculateSum()} грн.
              </span>
            ) : (
              <span>0 поз, 0 грн</span>
            )}
          </h2>
        </div>
        {isOpenStash && (
          <>
            <div onClick={(e) => e.preventDefault()} className="stash-list">
              <h3 className="stash-list-title">Кошик</h3>
              {stashItems.length === 0 ? (
                <div className="empty-list">
                  <img src={emptyStashImg} alt="" />
                  <p>
                    Наразі кошик порожній,<span>додайте хоча б один товар</span>
                  </p>
                  <Link onClick={() => dispatch(handleOpenStash())} to="/">
                    <button className="create-order-button">Каталог</button>
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="stash-list-content">
                    {stashItems.map((item) => (
                      <StashItem
                        key={nanoid()}
                        settings={item.obj}
                        counter={item.counter}
                      />
                    ))}
                  </ul>
                  <Link onClick={() => dispatch(handleOpenStash())} to="/order">
                    <button className="create-order-button">
                      <img src={shopIcon} alt="" /> Оформити замовлення
                    </button>
                  </Link>
                </>
              )}
            </div>
            <div
              style={{ opacity: isOpenStash ? "0.2" : "0" }}
              className="stash-list-filter"
              onClick={() => dispatch(handleOpenStash())}
            ></div>
          </>
        )}
      </div>
    </>
  );
};
export default Stash;
