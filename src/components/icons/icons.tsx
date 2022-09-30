import { useState } from "react"
import { SocialIcon } from "react-social-icons"

import styles from "./icons.module.scss"

export function Icon({
	url,
	defaultColor,
	hoverColor,
	style,
	label,
}: {
	url: string
	defaultColor: string
	hoverColor: string
	style?: React.CSSProperties
	label?: string
}): JSX.Element {
	const [hover, setHover] = useState(false)

	return (
		<div
			className={styles.icons}
			style={style}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<SocialIcon
				bgColor="rgba(0,0,0,0)"
				fgColor={hover ? hoverColor : defaultColor}
				label={label}
				url={url}
			/>
		</div>
	)
}

export default function Icons({ color }: { color: string }): JSX.Element {
	return (
		<div className={styles.mainContainer}>
			<ul className={styles.iconsContainer}>
				<li>
					<Icon
						style={{ animationDelay: "1.8s" }}
						url={"https://www.linkedin.com/in/gus-ryan-50/"}
						defaultColor={color}
						hoverColor="#0A66C2"
					/>
				</li>
				<li>
					<Icon
						style={{ animationDelay: "1.9s" }}
						url={"https://github.com/babyccino"}
						defaultColor={color}
						hoverColor="hsl(210, 66.7%, 90%)"
					/>
				</li>
				<li>
					<Icon
						style={{ animationDelay: "2.0s" }}
						url={"https://www.instagram.com/babyccino1/"}
						defaultColor={color}
						hoverColor="#e95950"
					/>
				</li>
			</ul>
			<div
				style={{ borderLeft: `1px solid ${color}`, animationDelay: "2.1s" }}
				className={styles.line}
			/>
		</div>
	)
}
