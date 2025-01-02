import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "../slice/buttonSlice";
import modeSwitching from "../slice/modeSwitching";
import popupSlice from "../slice/popupSlice";
import formSlice from "../slice/formSlice";

const store = configureStore({
  reducer: {
    button: buttonReducer,
    modeSwitch: modeSwitching,
    popup: popupSlice,
    form: formSlice,
  },
});
export default store;
