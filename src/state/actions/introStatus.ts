import { ActionType, IntroStatus, IntroStatusAction } from "../types"

export function visible(): IntroStatusAction {
	return {
		type: ActionType.SetIntroStatus,
		payload: IntroStatus.visible,
	}
}

export function requestUnmount(): IntroStatusAction {
	return {
		type: ActionType.SetIntroStatus,
		payload: IntroStatus.requestUnmount,
	}
}

export function willDisappear(): IntroStatusAction {
	return {
		type: ActionType.SetIntroStatus,
		payload: IntroStatus.willDisappear,
	}
}

export function notVisible(): IntroStatusAction {
	return {
		type: ActionType.SetIntroStatus,
		payload: IntroStatus.notVisible,
	}
}
