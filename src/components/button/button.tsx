import React, { MouseEventHandler } from "react"

import styles from "./button.module.scss"

import { linearGradient } from "../../util"

const Button = ({
	color,
	href,
	style,
	children,
	download,
	onClick,
}: {
	children: React.ReactNode
	color: string
	href?: string
	style?: Record<string, string>
	download?: boolean
	onClick?: MouseEventHandler<HTMLAnchorElement>
}): JSX.Element => (
	<a
		className={styles.button}
		href={href}
		role="button"
		style={{
			borderColor: color,
			color,
			backgroundImage: linearGradient(
				"90deg",
				color,
				color + " 49%",
				"transparent 50%"
			),
			...style,
		}}
		download
		onClick={onClick}
	>
		{children}
	</a>
)

export default Button
