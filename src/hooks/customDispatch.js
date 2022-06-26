import { useDispatch } from "react-redux";

import * as colorPalette from "../actions/colorPalette";
import { newColorPalette } from "../actions/introStatus";

const useCustomDispatch = () => {
  const dispatch = useDispatch();
  return {
    visible: () => dispatch(colorPalette.visible()),
    requestUnmount: () => dispatch(colorPalette.requestUnmount()),
    willDisappear: () => dispatch(colorPalette.willDisappear()),
    notVisible: () => dispatch(colorPalette.notVisible()),

    newColorPalette: () => dispatch(newColorPalette())
  };
}

export default useCustomDispatch;