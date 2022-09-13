import styles from "./projects.module.scss"

import React from "react"

import { useInView } from "react-intersection-observer"

import Project from "./project"
import { multipleClasses } from "../../util"
import { useColorPalette } from "../../hooks/colorPalette"
import projectsData from "./data"

export default function Projects(): JSX.Element {
	const options = {
		triggerOnce: true,
		rootMargin: "-200px 0px",
	}
	const [inViewRef, inView] = useInView(options)
	const colorPalette = useColorPalette()

	const mainColor = colorPalette[2]

	return (
		<section
			className={multipleClasses(styles.content, styles.projects)}
			ref={inViewRef}
			id="projects"
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
					<h3 style={{ color: mainColor }} className={styles.contentTitle}>
						My Projects
					</h3>
					<hr
						style={{ borderColor: mainColor }}
						className={multipleClasses(styles.line, styles.projectLine)}
					/>
				</div>
			</div>
			{projectsData.map(
				(datum, i): JSX.Element => (
					<div key={i} className={styles.project}>
						<Project color={colorPalette[(i + 3) % 5]} {...datum} />
					</div>
				)
			)}
		</section>
	)
}
