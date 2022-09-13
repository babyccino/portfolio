import { combineReducers } from "@reduxjs/toolkit";

import colorPalettes from "./colorPalettes";
import introStatus from "./introStatus";

const rootReducer = combineReducers({
  colorPalettes,
  introStatus
});
export default rootReducer;