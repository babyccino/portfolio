import styles from "./intro.module.scss"

import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import Bars from "../bars"
import Button from "../button"
import useCustomDispatch from "../../hooks/customDispatch"
import { useColorPalette } from "../../hooks/colorPalette"
import { IntroStatus as IntroStatusEnum, State } from "../../state/types"

const Right = () => (
	<span className={styles.rightContainer}>
		<span className={styles.rightAnimated1}>right</span>
		<span className={styles.rightAnimated2}>right</span>
		<span className={styles.rightTransparent}>right</span>
	</span>
)

const Intro = () => {
	const router = useRouter()
	const introStatus = useSelector(
		({ introStatus }: State): IntroStatusEnum => introStatus
	)
	if (introStatus === IntroStatusEnum.notVisible) router.push("/portfolio")

	const dispatch = useCustomDispatch()

	useEffect(() => {
		const onKeyDown = ({ code }: KeyboardEvent) => {
			if (code === "Enter") dispatch.requestUnmount()
		}

		document.addEventListener("keydown", onKeyDown)
		return document.removeEventListener("keydown", onKeyDown)
	}, [])

	const willDisappear = introStatus >= IntroStatusEnum.willDisappear
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
					<Button color={secondaryColor} onClick={dispatch.requestUnmount}>
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
