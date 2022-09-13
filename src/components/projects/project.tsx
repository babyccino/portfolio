import styles from "./project.module.scss"

import React from "react"
import Image from "next/image"

import { useInView } from "react-intersection-observer"

import { multipleClasses } from "../../util"
import { ProjectData } from "./data"

const Project = ({
	color,
	title,
	description,
	image,
	technologies,
	links,
}: ProjectData & { color: string }): JSX.Element => {
	const options = {
		triggerOnce: true,
		rootMargin: "-200px 0px",
	}
	const [inViewRef, inView] = useInView(options)

	return (
		<article
			style={{
				transform: inView ? "translateY(0)" : "translateY(100px)",
				opacity: inView ? 1 : 0,
			}}
			className={multipleClasses(styles.content, styles.project)}
			ref={inViewRef}
		>
			<div className={styles.contentInner}>
				<h3 style={{ color }} className={styles.contentTitle}>
					{title}
				</h3>
				<span className={styles.description}>{description}</span>
				<div className={styles.technologiesAndLinks}>
					<div className={styles.technologies}>{technologies.join(" ")}</div>
					<div className={styles.links}>{links}</div>
				</div>
			</div>
			<div className={styles.image}>
				<Image
					src={image}
					style={{ borderRadius: "10px" }}
					placeholder="blur"
					alt={title}
				/>
			</div>
		</article>
	)
}

export default Project
