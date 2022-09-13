import { useSelector } from "react-redux"

import { State } from "../state/types"

// simply returns the color of index: index from the current colour palette from the redux store
export function useColor(index: number) {
	function selector({ colorPalettes }: State): string {
		return colorPalettes[colorPalettes.length - 1][index]
	}
	return useSelector(selector)
}

// returns the latest colour palette from the redux store
export function useColorPalette() {
	function selector({ colorPalettes }: State): string[] {
		return colorPalettes[colorPalettes.length - 1]
	}
	return useSelector(selector)
}
