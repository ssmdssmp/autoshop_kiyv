import MainItem from "../MainList/MainItem";
import { useSelector } from "react-redux";
const SimilarItems = ({ subfilter }) => {
  const similarArr = useSelector((state) => state.items.filteredData);
  return (
    <ul className="similar-list">
      {similarArr.map((item) => {
        return <MainItem settings={item} />;
      })}
    </ul>
  );
};
export default SimilarItems;
