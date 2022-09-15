import { mkdir, NoParamCallback, writeFile as fsWriteFile } from "fs"

import commandLineArgs from "command-line-args"
import { dirname as getDirName } from "path"

const optionDefinitions = [
	{ name: "component", alias: "c", type: String, multiple: true },
]
const { component: components } = commandLineArgs(optionDefinitions)

const writeFile = (path: string, contents: any, cb: NoParamCallback) => {
	mkdir(getDirName(path), { recursive: true }, (err) => {
		if (err) return cb(err)

		fsWriteFile(path, contents, cb)
	})
}

for (const component of components) {
	const capitalised =
		component.slice(0, 1).toUpperCase() + component.slice(1).toLowerCase()
	const lowerCase = component.toLowerCase()

	const index = `import ${capitalised} from './${lowerCase}'

		export default ${capitalised}
		`

	const componentFile = `import styles from './${lowerCase}.module.scss'

		const ${capitalised} = (): JSX.Element => {


			return (
				<div className={styles.container}>

				</div>
			)
		}

		export default ${capitalised};
		`

	const sass = `.container {

		}
		`

	const directory = `${__dirname}/src/components/${component}`
	writeFile(`${directory}/index.ts`, index, (err) => {
		if (err) throw err
	})
	writeFile(`${directory}/${lowerCase}.tsx`, componentFile, (err) => {
		if (err) throw err
	})
	writeFile(`${directory}/${lowerCase}.module.scss`, sass, (err) => {
		if (err) throw err
	})
}
