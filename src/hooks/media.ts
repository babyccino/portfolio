import { useEffect, useState } from "react"

const getMatches = (query: string): boolean => {
	if (typeof window !== "undefined") {
		return window.matchMedia(query).matches
	}
	return false
}

export default function usePrefersReducedMotion(): boolean {
	const [matches, setMatches] = useState<boolean>(
		getMatches("(prefers-reduced-motion: reduce)")
	)

	function handleChange() {
		setMatches(getMatches("(prefers-reduced-motion: reduce)"))
	}

	useEffect(() => {
		const matchMedia = window.matchMedia("(prefers-reduced-motion: reduce)")

		handleChange()

		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange)
		} else {
			matchMedia.addEventListener("change", handleChange)
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange)
			} else {
				matchMedia.removeEventListener("change", handleChange)
			}
		}
	}, [])

	return matches
}
