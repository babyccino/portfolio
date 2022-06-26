import { introStatus } from "../util";

export const visible = () => ({type: "setIntroStatus", payload: introStatus.visible});
export const requestUnmount = () => ({type: "setIntroStatus", payload: introStatus.requestUnmount});
export const willDisappear = () => ({type: "setIntroStatus", payload: introStatus.willDisappear});
export const notVisible = () => ({type: "setIntroStatus", payload: introStatus.notVisible});
