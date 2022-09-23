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

	function handleChange(): void {
		setMatches(getMatches("(prefers-reduced-motion: reduce)"))
	}

	useEffect(() => {
		const matchMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
		handleChange()
		matchMedia.addEventListener("change", handleChange)

		return () => {
			matchMedia.removeEventListener("change", handleChange)
		}
	}, [])

	return matches
}
