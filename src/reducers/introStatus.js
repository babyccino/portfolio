import { introStatus as introSatusEnum } from "../components/util";

const introStatus = (state = introSatusEnum.visible, action) => {
  if (action.type === "setIntroStatus") return action.payload
  return state;
}

export default introStatus;