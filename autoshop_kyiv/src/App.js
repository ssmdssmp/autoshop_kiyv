import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  loadCars,
  loadFilters,
  loadProducers,
} from "./components/Filters/filtersSlice";
import { loadItems } from "./components/MainList/mainListSlice";
import MainPage from "./pages/MainPage";
import DeliveryPage from "./pages/DeliveryPage";
import { nanoid } from "@reduxjs/toolkit";

import SingleItemPage from "./pages/SingleItemPage";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import ContactsPage from "./pages/ContactsPage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFilters());
    dispatch(loadItems());
    dispatch(loadCars());
    dispatch(loadProducers());
  }, []);

  const router = createHashRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/:id",
      element: <SingleItemPage />,
      // children: <SingleItem />,
    },
    { path: "/order", element: <OrderPage /> },
    { path: "/contacts", element: <ContactsPage /> },
    { path: "/delivery", element: <DeliveryPage /> },
    // {
    //   path: "/privacy",
    //   element: <PrivacyPage />,
    // },
  ]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 300; i++) {
      arr.push(
        {
          id: nanoid(),
          title: "EUROREPAR PREMIUM C3 5W-30, 5л",
          producer: "GM",
          thumbnail: "https://i.ibb.co/WpxJgtw/image-3.png",
          price: 1509,
          filter: "Запчастини для ТО",
          subfilter: "Моторні оливи",
          tradeIndex: "#RG514531",
          cars: {
            brand: "Daewoo",
            models: [
              { model: "Lanos", years: [2001, 1999, 2000] },
              { model: "Sens", years: [2000, 1999, 2001] },
            ],
          },
        },
        {
          id: nanoid(),
          title: "Топливный фильтр Дизель",
          producer: "Epica",
          thumbnail: "https://i.ibb.co/hF01LQH/images-1.png",
          price: 436,
          filter: "Запчастини для ТО",
          subfilter: "Паливні фільтри",
          tradeIndex: "#BM502214",
          cars: {
            brand: "ЗАЗ",
            models: [
              { model: "Forza", years: [2002, 2003, 2006, 2009] },
              {
                model: "Славута",
                years: [1999, 2000, 2001, 2002, 2005, 2007, 2012],
              },
            ],
          },
        },
        {
          id: nanoid(),
          title: "Ліва фара LACCETTI",
          producer: "GM",
          thumbnail: "https://i.ibb.co/3pxcvNd/1722143-1-1.png",
          price: 1509,
          filter: "Кузовні деталі",
          subfilter: "Фари",
          tradeIndex: "#TRE134MV",
          cars: {
            brand: "Chevrolet",
            models: [
              { model: "Aveo", years: [2000, 2001, 2002] },
              {
                model: "Lacetti",
                years: [1999, 2000, 2001, 2002, 2004, 2006, 2015, 2020],
              },
            ],
          },
        },
        {
          id: nanoid(),
          title: "Амортизатор KYB KYB332803",
          producer: "Epica",
          thumbnail: "https://i.ibb.co/qMxtWNF/1.jpg",
          price: 203,
          filter: "Деталі підвіски",
          subfilter: "Амортизатори і стійки підвіски",
          tradeIndex: "KYB332803",
          cars: {
            brand: "Daewoo",
            models: [
              { model: "Lanos", years: [2001, 1999, 2000] },
              { model: "Nubira", years: [1999, 2000, 2001, 2002] },
            ],
          },
        }
      );
    }
    // console.log(JSON.stringify(arr));
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
