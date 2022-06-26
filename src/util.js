export const introStatus = {
  visible: 0,
  requestUnmount: 1,
  willDisappear: 2,
  notVisible: 3
}

export const brightnessByColor = color => {
  var color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    const hasFullSpec = color.length == 7;
    var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m) var r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16), g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16), b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m) var r = m[0], g = m[1], b = m[2];
  }
  if (typeof r != "undefined") return ((r*299)+(g*587)+(b*114))/1000;
}

export const compareByBrightness = (a, b) => (brightnessByColor(a) < brightnessByColor(b) ? 1 : -1);

const createCSSFunction = name => (...args) => `${name}(${args.join(', ')})`;

export const linearGradient = createCSSFunction("linear-gradient");
export const translate = createCSSFunction("translate");

export const multipleClasses = (...args) => args.join(" ");
