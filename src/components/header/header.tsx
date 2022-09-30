import styles from "./header.module.scss"

import { useEffect, useState } from "react"
import { animateScroll, Link, scroller } from "react-scroll"

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

	const aboutCb = reducedMotion
		? undefined
		: () => {
				scroller.scrollTo("about", {
					smooth: true,
					offset: NAV_HEIGHT,
				})
				disableHeaderHide?.()
		  }
	const projectsCb = reducedMotion
		? undefined
		: () => {
				scroller.scrollTo("projects", {
					smooth: true,
					offset: NAV_HEIGHT,
				})
				disableHeaderHide?.()
		  }
	const contactCb = reducedMotion
		? undefined
		: () => {
				animateScroll.scrollToBottom()
				disableHeaderHide?.()
		  }

	return (
		<div
			style={{ color: mainColor }}
			className={multipleClasses(
				isTopOfPage ? styles.topOfPage : undefined,
				scrollUp || clickLink ? undefined : styles.scrollDown,
				styles.mainContainer
			)}
		>
			<header className={styles.contentContainer}>
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
					aria-label="top of page"
				>
					G
				</a>
				<nav className={styles.sections}>
					<ul className={styles.sections}>
						<li>
							<a
								href="#about"
								style={{ animationDelay: "0.9s" }}
								onClick={aboutCb}
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#projects"
								style={{ animationDelay: "1.0s" }}
								onClick={projectsCb}
							>
								Projects
							</a>
						</li>
						<li>
							<a
								style={{ animationDelay: "1.1s" }}
								href="#contact"
								onClick={contactCb}
							>
								Contact
							</a>
						</li>
						<style jsx>{`
							a:hover,
							a:active {
								border-color: ${mainColor};
							}
						`}</style>
					</ul>
				</nav>
			</header>
		</div>
	)
}
