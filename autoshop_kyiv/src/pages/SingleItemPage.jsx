import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import SingleItem from "../components/SingleItem/SingleItem";
import MainList from "../components/MainList/MainList";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useDispatch } from "react-redux";
const SingleItemPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <Search />

      <SingleItem id={id} />
      <MainList />
      <Footer />
    </>
  );
};
export default SingleItemPage;
