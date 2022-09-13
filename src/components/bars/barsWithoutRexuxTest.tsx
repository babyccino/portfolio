import React from "react"

import styles from "./bars.module.scss"

import { multipleClasses } from "../../util"
import { defaultPalette } from "../../color"

interface CurrentlyAnimatingRefType {
	currentlyAnimating: boolean
	timeout: NodeJS.Timeout | null
	promise: Promise<void> | null
	queue: boolean
}
const currentlyAnimatingInitialState: CurrentlyAnimatingRefType = {
	currentlyAnimating: true,
	timeout: null,
	promise: null,
	queue: false,
}

const BarsTest = (): JSX.Element => {
	return (
		<div className={styles.container}>
			{defaultPalette.map((color, ii) => (
				<div
					key={ii}
					className={multipleClasses(styles[`swipeIn${ii}`], styles.bar)}
					style={{ backgroundColor: color }}
				/>
			))}
		</div>
	)
}

export default React.memo(BarsTest)
