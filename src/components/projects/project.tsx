import styles from "./project.module.scss"

import Image from "next/image"

import { useInView } from "react-intersection-observer"

import { multipleClasses } from "../../util"
import { ProjectData } from "./data"

export default function Project({
	color,
	title,
	description,
	image,
	technologies,
	links,
	first = false,
}: ProjectData & { color: string; first: boolean }): JSX.Element {
	const options = {
		triggerOnce: true,
		rootMargin: "-200px 0px",
	}
	const [inViewRef, inView] = useInView(options)

	return (
		<div
			className={multipleClasses(
				styles.container,
				inView ? styles.inView : styles.notInView
			)}
		>
			{first && inView && (
				<div className={styles.hoverHintContainer} style={{ color }}>
					<span className={styles.animationContainer}>
						<div className={styles.triangle} />
						<p className={styles.hoverHint}>hover to see more</p>
					</span>
				</div>
			)}
			<article
				className={multipleClasses(styles.content, styles.project)}
				ref={inViewRef}
			>
				<div className={styles.image}>
					<Image
						src={image}
						style={{
							borderRadius: "10px",
							width: "100%",
							top: 0,
							position: "relative",
						}}
						placeholder="blur"
						alt={title}
					/>
				</div>
				<div className={styles.contentInner}>
					<h3 style={{ color }} className={styles.contentTitle}>
						{title}
					</h3>
					<p className={styles.description}>{description}</p>
					<div className={styles.technologiesAndLinks}>
						<ul className={styles.technologies}>
							{technologies.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
						<ul className={styles.links}>
							{links.map((link, idx) => (
								<li key={idx}>{link}</li>
							))}
						</ul>
					</div>
				</div>
			</article>
		</div>
	)
}
