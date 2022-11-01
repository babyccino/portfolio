import styles from "./intro.module.scss"

import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { useColorPalette } from "../../hooks/colorPalette"
import useCustomDispatch from "../../hooks/customDispatch"
import { IntroStatus as IntroStatusEnum, State } from "../../state/types"
import Bars from "../bars"
import Button from "../button"
import { multipleClasses } from "../../util"

const Right = () => (
	<span className={styles.rightContainer}>
		<span className={styles.rightAnimated1}>right</span>
		<span className={styles.rightAnimated2}>right</span>
		<span className={styles.rightTransparent}>right</span>
	</span>
)

export default function Intro() {
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
	const [mainColor, secondaryColor] = useColorPalette()

	return (
		<div className={styles.container}>
			<div
				className={multipleClasses(
					styles.welcomeContainer,
					willDisappear ? styles.fadeOut : styles.fadeIn
				)}
			>
				<h1 style={{ color: mainColor }} className={styles.title}>
					Welcome
				</h1>
				<p className={styles.instructions}>
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
				</p>
				<div className={styles.button}>
					<Button color={secondaryColor} onClick={dispatch.requestUnmount}>
						Come and learn about me!
					</Button>
				</div>
			</div>
			<Bars className={styles.barsContainer} />
		</div>
	)
}
