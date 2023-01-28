import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = action.payload;
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
  },
});

export const {
  updateId,
  updateEmail,
  updateFirstName,
  updateLastName,
  updateAddressOne,
  updateAddressTwo,
  updateState,
  setUserData,
  updatePostCode,
  updateV,
} = userSlice.actions;

export default userSlice.reducer;
