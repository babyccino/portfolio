import styles from "./button.module.scss"

import { MouseEventHandler } from "react"

import { linearGradient } from "../../util"

export default function Button({
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
}): JSX.Element {
	return (
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
}
