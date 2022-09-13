import { ActionType } from "../types"

export function newColorPalette(): { type: ActionType } {
	return {
		type: ActionType.NewColorPalette,
	}
}
