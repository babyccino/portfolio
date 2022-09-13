const createCSSFunction =
	(name: string) =>
	(...args: string[]): string =>
		`${name}(${args.join(", ")})`

export const linearGradient = createCSSFunction("linear-gradient")
export const translate = createCSSFunction("translate")

export const multipleClasses = (...args: string[]) => args.join(" ")
