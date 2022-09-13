import { useDispatch } from "react-redux"

import { IntroStatus, ColorPalette } from "../state/actions"
import { IntroStatusAction, ActionType } from "../state/types"

interface CustomDispatch {
	visible: () => IntroStatusAction
	requestUnmount: () => IntroStatusAction
	willDisappear: () => IntroStatusAction
	notVisible: () => IntroStatusAction
	newColorPalette: () => { type: ActionType }
}

const useCustomDispatch = (): CustomDispatch => {
	const dispatch = useDispatch()
	return {
		visible: () => dispatch(IntroStatus.visible()),
		requestUnmount: () => dispatch(IntroStatus.requestUnmount()),
		willDisappear: () => dispatch(IntroStatus.willDisappear()),
		notVisible: () => dispatch(IntroStatus.notVisible()),

		newColorPalette: () => dispatch(ColorPalette.newColorPalette()),
	}
}

export default useCustomDispatch
