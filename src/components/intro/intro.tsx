import React from "react"
import { useSelector } from "react-redux"

import useCustomDispatch from "../../hooks/customDispatch"

import styles from "./intro.module.scss"

import { IntroStatus as IntroStatusEnum, State } from "../../state/types"

import Bars from "../bars/bars"
import Button from "../button/button"
import { useColorPalette } from "../../hooks/colorPalette"

const Right = () => (
	<span className={styles.rightContainer}>
		<span className={styles.rightAnimated1}>right</span>
		<span className={styles.rightAnimated2}>right</span>
		<span className={styles.rightTransparent}>right</span>
	</span>
)

const Intro = () => {
	const { requestUnmount } = useCustomDispatch()
	const willDisappear = useSelector(
		({ introStatus }: State): boolean =>
			introStatus >= IntroStatusEnum.willDisappear
	)
	const colorPalette = useColorPalette()

	const mainColor = colorPalette[0]
	const secondaryColor = colorPalette[1]

	return (
		<div
			className={
				styles.container + (willDisappear ? " " + styles.willDisappear : "")
			}
		>
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
					<Button color={secondaryColor} onClick={requestUnmount}>
						Come and learn about me!
					</Button>
				</div>
			</div>
			<div className={styles.barsContainer}>
				<Bars />
			</div>
		</div>
	)
}

export default Intro
