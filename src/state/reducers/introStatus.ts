import { IntroStatus, Action, ActionType } from "../types"

export default function introStatus(
	state: IntroStatus = IntroStatus.visible,
	action: Action
): IntroStatus {
	if (action.type === ActionType.SetIntroStatus) {
		return action.payload as IntroStatus
	}
	return state
}
