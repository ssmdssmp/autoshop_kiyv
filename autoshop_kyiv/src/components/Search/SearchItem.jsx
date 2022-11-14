import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearInputs } from "../MainList/mainListSlice";
import {
  handleActiveFilter,
  handleActiveSubFilter,
} from "../Filters/filtersSlice";
import { filterItems } from "../MainList/mainListSlice";
const SearchItem = ({ settings }) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(({ filters }) => filters.selectedFilters);
  return (
    <Link
      onClick={() => {
        dispatch(clearInputs());
        dispatch(handleActiveFilter(settings.filter));
        dispatch(handleActiveSubFilter(settings.subfilter));
        dispatch(filterItems(selectedFilters));
      }}
      className="search-item-wrapper"
      to={`/${settings.id}`}
    >
      <div className="search-item">
        <h4>{settings.title}</h4>

        <p>{settings.price} грн.</p>

        <p>{settings.tradeIndex}</p>
        <img src={settings.thumbnail} alt="" />
      </div>
    </Link>
  );
};
export default SearchItem;
