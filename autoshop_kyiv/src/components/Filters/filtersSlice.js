import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getFilters, getCars, getProducers } from "../../hooks/http.hook";

export const loadFilters = createAsyncThunk("filters/loadFilters", () => {
  return getFilters();
});
export const loadCars = createAsyncThunk("filters/loadCars", () => {
  return getCars();
});
export const loadProducers = createAsyncThunk("filters/loadProducers", () => {
  return getProducers();
});

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filtersLoadingStatus: "idle",
    filters: [],
    isOpenFilters: false,
    activeFilter: "",
    activeSubfilter: "",
    activeProducer: "",
    activeCar: { brand: "", model: "", year: "" },
    subfilters: "",
    selectedFilters: {
      filter: "",
      subfilter: "",
      producer: "",
      brand: "",
      model: "",
      year: "",
    },
    carsArr: [{ brand: "", models: [{ title: "", years: [] }] }],
    carBrands: [],
    carModels: [],
    carYears: [],
    producers: [],
  },
  reducers: {
    handleOpenFilters: (state) => {
      state.isOpenFilters = !state.isOpenFilters;
    },
    handleActiveFilter: (state, action) => {
      if (state.activeFilter === action.payload) {
        state.activeFilter = "";
        state.selectedFilters.filter = "";
        state.selectedFilters.subfilter = "";
      } else {
        state.activeFilter = action.payload;
        state.selectedFilters.filter = action.payload;
        state.selectedFilters.subfilter = "";
      }
    },
    deleteSelectedFilter: (state, action) => {
      state.selectedFilters[action.payload] = "";
      if (action.payload === "filter") {
        state.activeFilter = "";
        state.activeSubfilter = "";
        state.selectedFilters.subfilter = "";
      }
      if (action.payload === "brand") {
        state.selectedFilters.year = "";
        state.selectedFilters.model = "";
      }
      if (action.payload === "subfilter") {
        state.activeSubfilter = "";
      }
      if (action.payload === "model") {
        state.activeCar.model = "";
        state.activeCar.year = "";
        state.selectedFilters.year = "";
      }
    },
    handleClearFilters: (state) => {
      state.selectedFilters = {
        filter: "",
        producer: "",
        subfilter: "",
        brand: "",
        model: "",
        year: "",
      };
      state.activeFilter = "";
    },
    handleActiveSubFilter: (state, action) => {
      if (state.activeSubfilter === action.payload) {
        state.activeSubfilter = "";
        state.selectedFilters.subfilter = "";
      } else {
        state.activeSubfilter = action.payload;
        state.selectedFilters.subfilter = action.payload;

        state.selectedFilters.filter = state.filters.find((el) =>
          el.subFilters.some((el) => el.includes(action.payload))
        ).title;
      }
    },
    handleActiveProducer: (state, action) => {
      if (state.selectedFilters.producer === action.payload) {
        state.activeProducer = "";
        state.selectedFilters.producer = "";
      } else {
        state.activeProducer = action.payload;
        state.selectedFilters.producer = action.payload;
      }
    },
    handleActiveCar: (state, action) => {
      if (state.activeCar[action.payload.category] === action.payload.value) {
        state.activeCar[action.payload.category] = "";
        state.selectedFilters[action.payload.category] = "";
        switch (action.payload.category) {
          case "brand": {
            state.carModels = [];
            state.carYears = [];
            break;
          }
          case "model": {
            state.carYears = [];
            break;
          }
          default: {
            break;
          }
        }
      } else {
        state.activeCar[action.payload.category] = action.payload.value;
        state.selectedFilters[action.payload.category] = action.payload.value;
        switch (action.payload.category) {
          case "brand": {
            state.carModels = [];
            state.carsArr
              .filter((el) => el.brand === state.activeCar.brand)
              .map(({ models }) => {
                models.map((item) => {
                  state.carModels.push(item.model);
                });
              });

            break;
          }
          case "model": {
            state.carYears = [];
            state.carsArr
              .filter((el) => el.brand === state.activeCar.brand)
              .map((item) =>
                item.models.filter((el) => el.model === state.activeCar.model)
              )
              .map((item) =>
                item[0].years.map((year) => state.carYears.push(year))
              );
          }
          default: {
            break;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(loadFilters.fulfilled, (state, action) => {
        state.filters = [...action.payload];
      })
      .addCase(loadFilters.rejected, (state) => {
        console.log("error in fetch");
      })
      .addCase(loadCars.fulfilled, (state, action) => {
        state.carsArr = action.payload;
        action.payload.map((item) => {
          return state.carBrands.push(item.brand);
        });
      })
      .addCase(loadProducers.fulfilled, (state, action) => {
        action.payload.map((item) => {
          return state.producers.push(item.label);
        });
      })
      .addCase(loadProducers.rejected, (state) => {
        state.producers = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  handleOpenFilters,
  handleActiveFilter,
  deleteSelectedFilter,
  handleClearFilters,
  handleActiveSubFilter,
  handleActiveCar,
  handleActiveProducer,
} = filtersSlice.actions;

export default filtersSlice.reducer;
