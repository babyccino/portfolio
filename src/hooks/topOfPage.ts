import { useState, useEffect } from "react"

const useIsTopOfPage = (initialState: boolean): boolean => {
	const [topOfPage, setTopOfPage] = useState<boolean>(initialState)

	useEffect(() => {
		const updateTopOfPage = (): void => {
			const newTopOfPage = window.scrollY < 10
			if (topOfPage !== newTopOfPage) setTopOfPage(newTopOfPage)
		}

		window.addEventListener("scroll", updateTopOfPage)
		return () => window.removeEventListener("scroll", updateTopOfPage) // clean up
	}, [topOfPage])

	return topOfPage
}

export default useIsTopOfPage
