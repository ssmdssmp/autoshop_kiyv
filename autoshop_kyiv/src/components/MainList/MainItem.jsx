import shopIcon from "../../assets/img/shop_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { handleOpenFilters } from "../Filters/filtersSlice";
import { handleOpenStash, handleStashItems } from "../Stash/StashSlice";
const MainItem = ({ settings }) => {
  const dispatch = useDispatch();
  const isOpenFilters = useSelector((state) => state.filters.isOpenFilters);
  const stashItems = useSelector(({ stash }) => stash.stashItems);
  let { id } = useParams();
  return (
    <li className="main_item">
      <Link to={`/${settings.id}`}>
        <img
          // onClick={dispatch(handleOpenFilters())}
          src={settings.thumbnail}
          alt=""
          onClick={() => {
            window.scrollTo({ top: 70, behavior: "smooth" });
            if (isOpenFilters) {
              dispatch(handleOpenFilters());
            }
          }}
        />
      </Link>
      <p className="main_item-category">{settings.subfilter}</p>
      <p className="main_item-id">{settings.tradeIndex}</p>
      <p
        onClick={() => window.scrollTo({ top: 70, behavior: "smooth" })}
        className="main_item-tittle"
      >
        {settings.title}
      </p>
      <div className="main_item-price">
        <p>{settings.price} грн.</p>
        {}
        {stashItems.filter((el) => el.obj.id === settings.id).length !== 0 ? (
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #36AC0D",
            }}
            onClick={() => dispatch(handleOpenStash())}
          >
            <img
              style={{
                filter:
                  "invert(42%) sepia(23%) saturate(1352%) hue-rotate(87deg) brightness(100%) contrast(40%)",
              }}
              src={shopIcon}
              alt=""
            />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(handleStashItems({ obj: settings, counter: 1 }));
              dispatch(handleOpenStash());
            }}
          >
            <img src={shopIcon} alt="" />
          </button>
        )}
      </div>
    </li>
  );
};
export default MainItem;
