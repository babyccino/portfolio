import { generateNewColorPalette, defaultPalette } from "../../color"
import { Action, ActionType } from "../types"

export default function colorPalettes(
	state: string[][] = [defaultPalette],
	action: Action
): string[][] {
	if (action.type === ActionType.NewColorPalette) {
		const newColorPalette = generateNewColorPalette()
		return [...state, newColorPalette]
	}

	return state
}
