const createCSSFunction =
	(name: string) =>
	(...args: string[]): string =>
		`${name}(${args.join(", ")})`

export const linearGradient = createCSSFunction("linear-gradient")
export const translate = createCSSFunction("translate")

export function multipleClasses(...args: (string | undefined)[]): string {
	return args.reduce((prev, curr): string | undefined => {
		return curr === undefined || curr === "" ? prev : `${prev} ${curr}`
	}) as string
}
