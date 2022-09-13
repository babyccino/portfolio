export function brightnessByColor(color: string): number {
	const isHex = color.indexOf("#") == 0
	const isRgb = color.indexOf("rgb") == 0

	if (isHex) {
		const hasFullSpec = color.length == 7
		const colorArray = color
			.substr(1)
			.match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g)
		if (colorArray) {
			const red = parseInt(
				colorArray[0] + (hasFullSpec ? "" : colorArray[0]),
				16
			)
			const green = parseInt(
				colorArray[1] + (hasFullSpec ? "" : colorArray[1]),
				16
			)
			const blue = parseInt(
				colorArray[2] + (hasFullSpec ? "" : colorArray[2]),
				16
			)
			return (red * 299 + green * 587 + blue * 114) / 1000
		}
	}
	if (isRgb) {
		const colorArray = color.match(/(\d+){3}/g)
		if (colorArray) {
			const red = parseInt(colorArray[0])
			const green = parseInt(colorArray[1])
			const blue = parseInt(colorArray[2])
			return (red * 299 + green * 587 + blue * 114) / 1000
		}
	}

	throw new Error("Color was not parsable")
}

export function compareByBrightness(a: string, b: string): number {
	return brightnessByColor(a) < brightnessByColor(b) ? 1 : -1
}

function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export const defaultPalette = [
	"#ffc8dd",
	"#bde0fe",
	"#ffafcc",
	"#a2d2ff",
	"#cdb4db",
]

const paletteList: string[][] = [
	["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
	["#bcafda", "#8884ff", "#d7bce8", "#e8cee4", "#fde2ff"],
	["#80a1c1", "#eee3ab", "#d9cfc1", "#a77e58", "#ba3f1d"],
	["#59a4c2", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
	["#6298da", "#b08fc7", "#b56576", "#e56b6f", "#eaac8b"],
	["#ccd5ae", "#e9edc9", "#fefae0", "#faedcd", "#d4a373"],
	["#edede9", "#d6ccc2", "#f5ebe0", "#e3d5ca", "#d5bdaf"],
	["#a3a380", "#d6ce93", "#efebce", "#d8a48f", "#bb8588"],
	defaultPalette,
].map((palette) => palette.sort(compareByBrightness))
shuffleArray(paletteList)

let i = 1
export function generateNewColorPalette(): string[] {
	const newColorPalette = paletteList[i]
	i = (i + 1) % paletteList.length
	return newColorPalette
}
