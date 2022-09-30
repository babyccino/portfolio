import styles from "./underline-link.module.scss"

export default function UnderlineLink({
	url,
	color,
	children,
}: {
	url: string
	color: string
	children: string | number | null | undefined
}): JSX.Element {
	return (
		<a
			href={url}
			style={{ color, borderColor: color }}
			className={styles.hover}
		>
			{children}
		</a>
	)
}
