import styles from "./contact.module.scss"

import { useInView } from "react-intersection-observer"

import { multipleClasses } from "../../util"

import { useColor } from "../../hooks/colorPalette"
import Button from "../button/button"

export default function Contact(): JSX.Element {
	const options = {
		triggerOnce: true,
		rootMargin: "0px 0px",
	}
	const [inViewRef, inView] = useInView(options)
	const color = useColor(3)

	return (
		<section className={multipleClasses(styles.content, styles.contact)}>
			<div className={styles.contentInner} ref={inViewRef}>
				<div
					className={multipleClasses(
						styles.contentTitleContainer,
						styles.beforeFadeIn,
						inView ? styles.fadeIn : undefined
					)}
					style={{ animationDelay: "200ms" }}
				>
					<h3 style={{ color }} className={styles.contentTitle}>
						Always down to chat
					</h3>
				</div>
				<p
					style={{ display: "inline-block", animationDelay: "400ms" }}
					className={multipleClasses(
						styles.beforeFadeIn,
						inView ? styles.fadeIn : undefined
					)}
				>
					I&apos;m currently open to any and all opportunties
				</p>
				<div
					style={{ animationDelay: "600ms" }}
					className={multipleClasses(
						styles.buttonContainer,
						styles.beforeFadeIn,
						inView ? styles.fadeIn : undefined
					)}
					id="contact"
				>
					<Button
						href="mailto:gus.ryan163@gmail.com"
						color={color}
						style={{ marginRight: "1em" }}
					>
						Email me
					</Button>
					<Button
						href="/Resume - Gus Ryan.pdf"
						download
						color={color}
						style={{ marginLeft: "1em" }}
					>
						Resume
					</Button>
				</div>
			</div>
		</section>
	)
}
