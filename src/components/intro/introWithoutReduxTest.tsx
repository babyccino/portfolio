import React from "react"

import styles from "./intro.module.scss"

import BarsTest from "../bars/barsWithoutRexuxTest"
import Button from "../button/button"
import { defaultPalette } from "../../color"

const Right = () => (
	<span className={styles.rightContainer}>
		<span className={styles.rightAnimated1}>right</span>
		<span className={styles.rightAnimated2}>right</span>
		<span className={styles.rightTransparent}>right</span>
	</span>
)

const IntroTest = () => {
	const mainColor = defaultPalette[0]
	const secondaryColor = defaultPalette[1]

	return (
		<div className={styles.container}>
			<div className={styles.welcomeContainer}>
				<h1 style={{ color: mainColor }} className={styles.title}>
					Welcome
				</h1>
				<h2 className={styles.instructions}>
					Don&apos;t like the color palette? Then neither do I! <br />
					Press&nbsp;
					<span style={{ color: secondaryColor }} className={styles.spacebar}>
						spacebar
					</span>
					&nbsp;or&nbsp;
					<span style={{ color: secondaryColor }}>
						swipe&nbsp;
						<Right />
					</span>
					&nbsp;to change it
				</h2>
				<div className={styles.button}>
					<Button color={secondaryColor} onClick={() => {}}>
						Come and learn about me!
					</Button>
				</div>
			</div>
			<div className={styles.barsContainer}>
				<BarsTest />
			</div>
		</div>
	)
}

export default IntroTest
