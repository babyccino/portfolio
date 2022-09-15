import React, { useEffect, useState } from "react"
import { Link, animateScroll } from "react-scroll"

import useIsScrollingUp from "../../hooks/scrollUp"
import useIsTopOfPage from "../../hooks/topOfPage"
import { multipleClasses, linearGradient } from "../../util"

import styles from "./header.module.scss"
import { useColorPalette } from "../../hooks/colorPalette"

const NAV_HEIGHT = 50

const Header = (): JSX.Element => {
	const scrollUp = useIsScrollingUp(true)
	const isTopOfPage = useIsTopOfPage(true)
	const [clickLink, setClickLink] = useState(false)
	const colorPalette = useColorPalette()

	const mainColor = colorPalette[0]
	const secondaryColor = colorPalette[1]

	// if a link is clicked disable the navbar being hidden until the user presses a key or scrolls
	const disableHeaderHide = () => setClickLink(true)
	useEffect(() => {
		const listener = () => setClickLink(false)
		document.addEventListener("keydown", listener)
		document.addEventListener("wheel", listener)
		document.addEventListener("touchmove", listener)
		return () => {
			document.removeEventListener("keydown", listener)
			document.removeEventListener("wheel", listener)
			document.removeEventListener("touchmove", listener)
		}
	}, [])

	return (
		<div
			style={{ color: mainColor }}
			className={multipleClasses(
				isTopOfPage ? styles.topOfPage : "",
				scrollUp || clickLink ? "" : styles.scrollDown,
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
					onClick={() => animateScroll.scrollToTop()}
				>
					G
				</a>
				<nav className={styles.sections}>
					<Link
						to="about"
						smooth
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
						smooth
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
						onClick={() => {
							animateScroll.scrollToBottom()
							disableHeaderHide()
						}}
					>
						Contact
					</a>
				</nav>
			</div>
		</div>
	)
}

export default Header
