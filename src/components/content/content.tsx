import styles from "./content.module.scss"

import About from "../about"
import Projects from "../projects"
import Icons from "../icons"

import { linearGradient } from "../../util"
import Contact from "../contact"
import { useColorPalette } from "../../hooks/colorPalette"

export default function Content(): JSX.Element {
	const colorPalette: string[] = useColorPalette()

	return (
		<main className={styles.main}>
			<div className={styles.introduction}>
				<h3 className={styles.hi}>Hi, I&apos;m</h3>
				<h1
					style={{
						backgroundImage: linearGradient(
							"80deg",
							...colorPalette,
							colorPalette[0]
						),
					}}
					className={styles.name}
				>
					Gus Ryan.
				</h1>
				<h2 className={styles.tagline}>
					I enjoy creating things for the internet.
				</h2>
			</div>

			<About />

			<Projects />

			<Contact />

			<div className={styles.footer}>
				<Icons color={colorPalette[0]} />
				Developed by Gus Ryan, thanks for checking it out!
			</div>
		</main>
	)
}
