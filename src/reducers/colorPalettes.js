import { compareByBrightness } from "../components/util";

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let i = 1;
let paletteList = [
  ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
  ["#bcafda", "#8884ff", "#d7bce8", "#e8cee4", "#fde2ff"],
  ["#d4a373", "#e9edc9", "#fefae0", "#faedcd", "#ccd5ae"],
  ["#80a1c1", "#eee3ab", "#d9cfc1", "#a77e58", "#ba3f1d"],
  ["#59a4c2", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  ["#6298da", "#b08fc7", "#b56576", "#e56b6f", "#eaac8b"],
];

paletteList = paletteList.map(palette => palette.sort(compareByBrightness));
shuffleArray(paletteList);

const defaultPalette = ['#ffc8dd', '#bde0fe', '#ffafcc', '#a2d2ff', '#cdb4db'];
const colorPalettes = (state = [defaultPalette], action) => {
  switch (action.type) {
  case "newColorPalette":
    console.log("newColorPalette");
    const newColorPalette = paletteList[i];
    i = (i + 1) % paletteList.length;
    return [...state, newColorPalette];
  case "lastColorPalette":
    const newColorPalettes = [...state];
    newColorPalettes.pop();
    return newColorPalettes;
  default:
    return state;
  }
}

export default colorPalettes;
