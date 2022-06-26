import { introStatus as introStatusEnum } from "../util";

const introStatus = (state = introStatusEnum.visible, action) => {
  if (action.type === "setIntroStatus") return action.payload
  return state;
}

export default introStatus;