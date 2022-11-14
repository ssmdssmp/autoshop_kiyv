import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRegions, getCities, getPostOffices } from "../../hooks/http.hook";
export const setRegions = createAsyncThunk("stash/setRegions", () => {
  return getRegions();
});
export const setCities = createAsyncThunk(
  "stash/setCities",
  (selectedRegion) => {
    return getCities(selectedRegion);
  }
);
export const setPostOffices = createAsyncThunk(
  "stash/setPostOffices",
  (selectedCity) => {
    return getPostOffices(selectedCity);
  }
);

const StashSlice = createSlice({
  name: "stash",
  initialState: {
    isOpenStash: false,
    stashItems: [],
    sum: 0,
    orderDetails: {
      client: {
        name: "",
        email: "",
        phone: "",
      },
      selectDelivery: {
        regions: [],
        cities: [],
        postOfficeNumbers: [],
      },
      delivery: {
        deliveryMethod: ["courier", "selfDelivery", "selfDeliveryFromStore"],
        adress: {
          region: "",
          city: "",
          postOfficeNumber: "",
        },
        deliveryCost: 0,
      },
      paymentMethod: ["afterReceiving", "card"],
    },
  },

  reducers: {
    handleOpenStash: (state) => {
      state.isOpenStash = !state.isOpenStash;
    },
    handleStashItems: (state, action) => {
      if (state.stashItems.some((el) => el.obj.id === action.payload.obj.id)) {
      } else {
        state.stashItems.push(action.payload);
      }
    },
    handleCounter: (state, action) => {
      state.stashItems.find((el) => el.obj.id === action.payload.id).counter =
        action.payload.counter;
    },
    deleteStashItem: (state, action) => {
      state.stashItems.pop(action.payload);
    },
    resetStashItems: (state) => {
      state.stashItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRegions.fulfilled, (state, action) => {
        state.orderDetails.selectDelivery.regions = action.payload;
      })
      .addCase(setRegions.rejected, (state) => {
        state.orderDetails.selectDelivery.regions = [];
      })
      .addCase(setCities.fulfilled, (state, action) => {
        state.orderDetails.selectDelivery.cities = action.payload;
      })
      .addCase(setCities.rejected, (state) => {
        state.orderDetails.selectDelivery.regions = [];
      })
      .addCase(setPostOffices.fulfilled, (state, action) => {
        state.orderDetails.selectDelivery.postOfficeNumbers = action.payload;
      })
      .addCase(setPostOffices.rejected, (state) => {
        state.orderDetails.selectDelivery.postOfficeNumbers = [];
      });
  },
});
export const {
  handleOpenStash,
  handleStashItems,
  handleCounter,
  deleteStashItem,
  resetStashItems,
} = StashSlice.actions;
export default StashSlice.reducer;
