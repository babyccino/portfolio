export enum ActionType {
	SetIntroStatus,
	NewColorPalette,
}

export enum IntroStatus {
	visible,
	requestUnmount,
	willDisappear,
	notVisible,
}

export interface Action {
	type: ActionType
	payload?: any
}

export interface State {
	colorPalettes: string[][]
	introStatus: IntroStatus
}

export type IntroStatusAction = { type: ActionType; payload: IntroStatus }
