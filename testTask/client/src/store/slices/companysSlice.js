import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyData: null,
  trackCompanyList: [],
  loading: false,
};

export const companysSlice = createSlice({
  name: "companysSlice",
  initialState,
  reducers: {
    setCompanysData(state, action) {
      state.companyData = action.payload;
    },
    settrackCompanysData(state, action) {
      if (state.trackCompanyList.length > 0) {
        state.trackCompanyList.map((item, index) => {
          if (item.price - action.payload[index].price > 0) {
            action.payload[index].glow = "green";
          } else {
            action.payload[index].glow = "red";
          }
        });
      }
      state.trackCompanyList = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addToList(state, action) {
      state.trackCompanyList.push(action.payload);
    },
    deleteFromList(state, action) {
      let indexForDelete;
      state.trackCompanyList.map((item, index) => {
        if (item.name === action.payload) {
          indexForDelete = index;
        }
      });
      state.trackCompanyList.splice(indexForDelete, 1);
    },
  },
  extraReducers: {},
});

export const {
  setCompanysData,
  settrackCompanysData,
  setLoading,
  addToList,
  deleteFromList,
} = companysSlice.actions;

export default companysSlice.reducer;
