import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  errors: { validationError: true, countryValidationError: true },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = action.payload;
    },
    updateCardNumber: (state, action) => {
      state.currentUser.card_number = action.payload;
    },
    updateCountry: (state, action) => {
      state.currentUser.country = action.payload;
    },
    updateCCV: (state, action) => {
      state.currentUser.ccv = action.payload;
    },
    updateExpirationDate: (state, action) => {
      state.currentUser.expiration_date = action.payload;
    },
    updateAddressOne: (state, action) => {
      state.currentUser.address_one = action.payload;
    },
    updateAddressTwo: (state, action) => {
      state.currentUser.address_two = action.payload;
    },
    updateState: (state, action) => {
      state.currentUser.state = action.payload;
    },
    updatePostCode: (state, action) => {
      state.currentUser.post_code = action.payload;
    },
    updateValidationError: (state, action) => {
      state.errors.validationError = action.payload;
    },
    updateCountryValidationError: (state, action) => {
      state.errors.countryValidationError = action.payload;
    },
  },
});

export const {
  updateAddressOne,
  updateCardNumber,
  updateCCV,
  updateExpirationDate,
  updateAddressTwo,
  updateCountry,
  updateState,
  setUserData,
  updatePostCode,
  updateValidationError,
  updateCountryValidationError,
} = userSlice.actions;

export default userSlice.reducer;
