import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { getItems } from "../../hooks/http.hook";
export const loadItems = createAsyncThunk("items/loadItems", () => {
  return getItems();
});
const mainListSlice = createSlice({
  name: "items",
  initialState: {
    loadingStatus: "idle",
    itemsList: [[]],
    pages: 1,
    currentPage: 1,
    offset: 0,
    filteredData: [],
    sortedData: [],

    currentItem: {},
    prevItem: {},
    nextItem: {},
    foundData: [],
    searchByNameInput: "",
    searchByIndexInput: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      if (action.payload === "...") {
        state.currentPage = +state.currentPage + 5;
      } else if (action.payload === "..") {
        state.currentPage = +state.currentPage - 5;
      } else {
        state.currentPage = action.payload;
      }
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
    filterItems: (state, action) => {
      state.filteredData = state.itemsList;
      if (
        action.payload.filter === "" &&
        action.payload.brand === "" &&
        action.payload.producer === ""
      ) {
        state.filteredData = state.itemsList;
        state.sortedData = state.itemsList;
        state.pages = Math.floor(state.filteredData.length / 24);
      } else {
        Object.entries(action.payload)
          .filter((item) => item[1] !== "")
          .map((item) => {
            switch (item[0]) {
              case "brand": {
                state.filteredData = [
                  ...state.filteredData.filter(
                    (el) => el.cars.brand === item[1]
                  ),
                ];
                break;
              }
              case "model": {
                state.filteredData = [
                  ...state.filteredData.filter((el) =>
                    el.cars.models.some((model) => model.model === item[1])
                  ),
                ];
                break;
              }
              case "year": {
                state.filteredData = [
                  ...state.filteredData.filter((el) =>
                    el.cars.models.some((model) =>
                      model.years.some((year) => year === +item[1])
                    )
                  ),
                ];
                break;
              }

              default: {
                state.filteredData = [
                  ...state.filteredData.filter((el) => el[item[0]] === item[1]),
                ];

                break;
              }
            }
          });
        state.sortedData = state.filteredData;
        state.pages = Math.floor(state.filteredData.length / 24);
      }
    },
    sortItems: (state, action) => {
      state.sortedData = [...state.filteredData];
      switch (action.payload) {
        case "alphabet": {
          state.sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        }
        case "popular": {
          state.sortedData = [...state.filteredData];

          break;
        }
        case "cheap": {
          state.sortedData.sort((a, b) => a.price - b.price);
          break;
        }
        case "expensive": {
          state.sortedData.sort((a, b) => a.price - b.price).reverse();
          break;
        }
        default: {
          break;
        }
      }
    },
    setCurrentItem: (state, action) => {
      state.currentItem = state.itemsList.filter(
        (el) => el.id === action.payload
      )[0];
    },
    setNextItem: (state, action) => {
      switch (action.payload) {
        case "next": {
          state.currentItem = state.currentItem =
            state.itemsList[state.itemsList.indexOf(state.currentItem + 1)];
          break;
        }
        case "prev": {
          state.currentItem = state.currentItem =
            state.itemsList[state.itemsList.indexOf(state.currentItem - 1)];
          break;
        }
        default: {
          break;
        }
      }
    },
    handleSearchByName: (state, action) => {
      state.foundData = state.itemsList.filter((el) =>
        el.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.searchByNameInput = action.payload;
      state.searchByIndexInput = "";
    },
    handleSearchByIndex: (state, action) => {
      state.foundData = state.itemsList.filter((el) =>
        el.tradeIndex.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.searchByIndexInput = action.payload;
      state.searchByNameInput = "";
    },
    clearInputs: (state) => {
      state.searchByIndexInput = "";
      state.searchByNameInput = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.itemsList = [...action.payload];
        state.filteredData = [...action.payload];
        state.sortedData = [...action.payload];
        state.pages = Math.floor(action.payload.length / 24);
        state.currentItem = action.payload[1];
      });
  },
});
export const {
  setCurrentPage,
  setCurrentItem,
  resetCurrentPage,
  filterItems,
  setNextCurrentItem,
  sortItems,
  setNextItem,
  handleSearchByName,
  handleSearchByIndex,
  clearInputs,
} = mainListSlice.actions;
export default mainListSlice.reducer;
