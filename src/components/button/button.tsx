import styles from "./button.module.scss"

import { AnchorHTMLAttributes } from "react"

import { linearGradient, multipleClasses } from "../../util"

export default function Button(
	props: AnchorHTMLAttributes<HTMLAnchorElement> & {
		color: string
	}
): JSX.Element {
	return (
		<a
			{...props}
			className={multipleClasses(styles.button, props.className)}
			href={props.href || "javascript:;"}
			role="button"
			style={{
				borderColor: props.color,
				color: props.color,
				backgroundImage: linearGradient(
					"90deg",
					props.color,
					props.color + " 49%",
					"transparent 50%"
				),
				...props.style,
			}}
		>
			{props.children}
		</a>
	)
}
