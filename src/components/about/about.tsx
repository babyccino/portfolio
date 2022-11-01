import styles from "./about.module.scss"

import Image from "next/image"

import { useInView } from "react-intersection-observer"
import { Element } from "react-scroll"

import profile from "../../../public/profile.jpg"

import { useColor } from "../../hooks/colorPalette"
import { multipleClasses } from "../../util"
import UnderlineLink from "../underline-link"

export default function About(): JSX.Element {
	const options = {
		triggerOnce: true,
		rootMargin: "-200px 0px",
	}
	const [inViewRef, inView] = useInView(options)
	const color = useColor(1)

	return (
		<Element name="about">
			<section
				className={multipleClasses(styles.content, styles.about)}
				ref={inViewRef}
				id="about"
			>
				<div className={styles.contentInner}>
					<div
						className={multipleClasses(
							styles.contentTitleContainer,
							inView ? styles.fadeIn : styles.beforeFadeIn
						)}
						style={{ animationDelay: "200ms" }}
					>
						<h3 style={{ color }} className={styles.contentTitle}>
							About me
						</h3>
						<hr style={{ borderColor: color }} className={styles.line} />
					</div>
					<span
						style={{ display: "inline-block", animationDelay: "1500ms" }}
						className={multipleClasses(
							styles.beforeFadeIn,
							inView ? styles.fadeIn : undefined
						)}
					>
						<p>
							Hi! My name is Gus and I&apos;m an aspiring software developer.
							I&apos;m originally from Perth, Western Australia but currently
							based in Canada. With a background in Maths and Physics, I&apos;m
							fascinated by the intricacies of how things work and enjoy using
							logic to solve problems
						</p>
						<p>
							I became interested in software development a few years ago after
							discovering a passion for building useful applications from
							scratch. I&apos;m now looking to apply my skills in creating tools
							to help users be more efficient
						</p>
						<p>
							Besides coding at my desk, I can be found&nbsp;
							<UnderlineLink
								url="https://www.youtube.com/channel/UCtWqQrnozUZXpxnjhVgUTUw"
								color={color}
							>
								climbing rocks
							</UnderlineLink>
							&nbsp;and&nbsp;
							<UnderlineLink url="https://www.gus-ryan.com/" color={color}>
								photographing natural landscapes
							</UnderlineLink>
						</p>
						<p className={styles.languagesTechnologies}>
							Languages/technologies I&apos;ve used:
						</p>
						<ul style={{ color }} className={styles.technologies}>
							<li>typescript</li>
							<li>javascript</li>
							<li>react</li>
							<li>html</li>
							<li>css</li>
							<li>postgresql</li>
						</ul>
					</span>
				</div>
				<div
					className={multipleClasses(
						styles.image,
						styles.beforeFadeIn,
						inView ? styles.fadeIn : undefined
					)}
					style={{ backgroundColor: color, animationDelay: "1000ms" }}
				>
					<div style={{ borderColor: color }} className={styles.box} />
					<div className={styles.noFilterImage}>
						<Image
							fill
							src={profile}
							style={{
								borderRadius: "10px",
							}}
							alt="A picture of me, Gus Ryan, in Red Rock national park in Nevada"
						/>
					</div>
					<div
						className={styles.imageContainer}
						style={{ backgroundColor: color }}
					>
						<Image
							fill
							src={profile}
							style={{
								filter: "grayscale(100%)",
								mixBlendMode: "multiply",
								borderRadius: "10px",
							}}
							alt="A picture of me, Gus Ryan, in Red Rock national park in Nevada"
						/>
					</div>
				</div>
			</section>
		</Element>
	)
}
