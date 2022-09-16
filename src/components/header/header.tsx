import styles from "./header.module.scss"

import { useEffect, useState } from "react"
import { animateScroll, Link } from "react-scroll"

import { useColorPalette } from "../../hooks/colorPalette"
import useIsScrollingUp from "../../hooks/scrollUp"
import useIsTopOfPage from "../../hooks/topOfPage"
import { linearGradient, multipleClasses } from "../../util"
import usePrefersReducedMotion from "../../hooks/media"

const NAV_HEIGHT = -50

export default function Header(): JSX.Element {
	const reducedMotion = usePrefersReducedMotion()
	const scrollUp = useIsScrollingUp(true)
	const isTopOfPage = useIsTopOfPage(true)
	const [clickLink, setClickLink] = useState(false)
	const [mainColor, secondaryColor] = useColorPalette()

	// if a link is clicked disable the navbar being hidden until the user presses a key or scrolls
	const disableHeaderHide = reducedMotion ? undefined : () => setClickLink(true)
	useEffect(() => {
		const scrollUnsetsFocus = () =>
			(document.activeElement as HTMLElement).blur()
		document.addEventListener("wheel", scrollUnsetsFocus)

		const listener = () => setClickLink(false)
		document.addEventListener("keydown", listener)
		document.addEventListener("wheel", listener)
		document.addEventListener("touchmove", listener)

		return () => {
			document.removeEventListener("wheel", scrollUnsetsFocus)

			document.removeEventListener("keydown", listener)
			document.removeEventListener("wheel", listener)
			document.removeEventListener("touchmove", listener)
		}
	}, [])

	return (
		<div
			style={{ color: mainColor }}
			className={multipleClasses(
				isTopOfPage ? styles.topOfPage : undefined,
				scrollUp || clickLink ? undefined : styles.scrollDown,
				styles.mainContainer
			)}
		>
			<div className={styles.contentContainer}>
				<a
					className={styles.logo}
					style={{
						backgroundImage: linearGradient(
							"135deg",
							mainColor,
							secondaryColor
						),
						animationDelay: "0.8s",
					}}
					href="#"
					onClick={reducedMotion ? undefined : animateScroll.scrollToTop}
				>
					G
				</a>
				<nav className={styles.sections}>
					<Link
						to="about"
						href="#about"
						smooth={!reducedMotion}
						offset={NAV_HEIGHT}
						style={{
							borderColor: mainColor,
							animationDelay: "0.9s",
						}}
						onClick={disableHeaderHide}
					>
						About
					</Link>
					<Link
						to="projects"
						href="#projects"
						smooth={!reducedMotion}
						offset={NAV_HEIGHT}
						style={{
							borderColor: mainColor,
							animationDelay: "1.0s",
						}}
						onClick={disableHeaderHide}
					>
						Projects
					</Link>
					<a
						style={{
							borderColor: mainColor,
							animationDelay: "1.1s",
						}}
						href="#contact"
						onClick={
							reducedMotion
								? undefined
								: () => {
										animateScroll.scrollToBottom()
										disableHeaderHide?.()
								  }
						}
					>
						Contact
					</a>
				</nav>
			</div>
		</div>
	)
}
