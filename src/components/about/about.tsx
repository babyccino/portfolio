import React from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

import { useSelector } from "react-redux"

import styles from "./about.module.scss"

import { multipleClasses } from "../../util"
import type { State } from "../../state/types"

import profile from "../../../public/profile.jpg"
import { useColor } from "../../hooks/colorPalette"

const About = (): JSX.Element => {
	const options = {
		triggerOnce: true,
		rootMargin: "-200px 0px",
	}
	const [inViewRef, inView] = useInView(options)
	const color = useColor(1)

	return (
		<section
			className={multipleClasses(styles.content, styles.about)}
			ref={inViewRef}
			id="about"
		>
			<div className={styles.contentInner}>
				<div
					className={multipleClasses(
						styles.contentTitleContainer,
						styles.beforeFadeIn,
						inView ? styles.fadeIn : ""
					)}
					style={{ animationDelay: "200ms" }}
				>
					<h3 style={{ color: color }} className={styles.contentTitle}>
						About me
					</h3>
					<hr style={{ borderColor: color }} className={styles.line} />
				</div>
				<span
					style={{ display: "inline-block", animationDelay: "1500ms" }}
					className={multipleClasses(
						styles.beforeFadeIn,
						inView ? styles.fadeIn : ""
					)}
				>
					<p>
						Hi! My name is Gus and I&apos;m an{" "}
						<span style={{ color }}>aspiring software developer</span>.&nbsp;
						I&apos;m originally from Perth, Western Australia but currently
						based in Canada. With a background in Maths and Physics, I&apos;m
						fascinated by the intricacies of how things work and enjoy using
						logic to solve problems
					</p>
					<p>
						I became interested in software development a few years ago after
						discovering a passion for building useful things from scratch.
						I&apos;m now looking to apply my skills in creating tools to help
						users be more efficient
					</p>
					<p>
						Besides coding at my desk, I can be found climbing rocks and
						photographing natural landscapes
					</p>
					<p>
						<br />
						Languages/technologies I&apos;ve used:
					</p>
					<p style={{ color }} className={styles.technologies}>
						JavaScript React HTML CSS
					</p>
				</span>
			</div>
			<div
				className={multipleClasses(
					styles.image,
					styles.beforeFadeIn,
					inView ? styles.fadeIn : ""
				)}
				style={{ backgroundColor: color, animationDelay: "1000ms" }}
			>
				<Image
					src={profile}
					style={{
						filter: "grayscale(100%)",
						mixBlendMode: "multiply",
						borderRadius: "10px",
					}}
					alt="Picture of me"
				/>
			</div>
		</section>
	)
}

export default About
