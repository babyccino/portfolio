import styles from "./bars.module.scss"

import { memo, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import useCustomDispatch from "../../hooks/customDispatch"

import { useSwipeable } from "react-swipeable"

import { IntroStatus as IntroStatusEnum, State } from "../../state/types"
import { multipleClasses } from "../../util"

interface CurrentlyAnimatingRefType {
	currentlyAnimating: boolean
	timeout: NodeJS.Timeout | null
	promise: Promise<void> | null
	queue: boolean
}
const currentlyAnimatingInitialState: CurrentlyAnimatingRefType = {
	currentlyAnimating: true,
	timeout: null,
	promise: null,
	queue: false,
}

const Bars = (): JSX.Element => {
	const dispatch = useCustomDispatch()

	const colorPalettes = useSelector(
		(state: State): string[][] => state.colorPalettes
	)

	const currentlyAnimating = useRef(currentlyAnimatingInitialState)
	let introStatus = useSelector(({ introStatus }: State): IntroStatusEnum => {
		switch (introStatus) {
			case IntroStatusEnum.requestUnmount:
				if (currentlyAnimating.current.currentlyAnimating) {
					currentlyAnimating.current.promise?.then(() =>
						dispatch.willDisappear()
					)
					return IntroStatusEnum.visible
				}

				dispatch.willDisappear()
				return IntroStatusEnum.willDisappear
			case IntroStatusEnum.visible:
			case IntroStatusEnum.willDisappear:
			case IntroStatusEnum.notVisible:
			default:
				return introStatus
		}
	})

	const firstAngle = -21
	const firstBarDuration = 800
	const animationTime =
		firstBarDuration * ((2 * -firstAngle) / (firstAngle + 90) + 1)

	if (introStatus === IntroStatusEnum.willDisappear)
		setTimeout(() => dispatch.notVisible(), animationTime - 100)

	useEffect(() => {
		const i = colorPalettes.length - 1

		if (currentlyAnimating.current.timeout)
			clearTimeout(currentlyAnimating.current.timeout)
		currentlyAnimating.current.currentlyAnimating = true

		currentlyAnimating.current.promise = new Promise<void>((res) => {
			currentlyAnimating.current.timeout = setTimeout(() => {
				currentlyAnimating.current.currentlyAnimating = false

				res()
			}, animationTime)
		})
	}, [colorPalettes])

	// allow user to queue one newColorPalette action but no more than one
	const handleNewColorPalette = () => {
		if (introStatus === IntroStatusEnum.visible) {
			if (
				currentlyAnimating.current.currentlyAnimating &&
				!currentlyAnimating.current.queue
			) {
				currentlyAnimating.current.queue = true
				currentlyAnimating.current.promise?.then(() => {
					dispatch.newColorPalette()
					currentlyAnimating.current.queue = false
				})
			}
			if (!currentlyAnimating.current.currentlyAnimating) {
				dispatch.newColorPalette()
			}
		}
	}

	useEffect(() => {
		const onKeyDown = ({ code }: KeyboardEvent) =>
			code === "Space" ? handleNewColorPalette() : null

		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [])

	const handlers = useSwipeable({
		onSwipedRight: handleNewColorPalette,
		swipeDuration: 1500,
	})

	const len = colorPalettes.length
	const barsWillDisappear = introStatus >= IntroStatusEnum.willDisappear

	return (
		<div className={styles.container} {...handlers}>
			<BarsInner
				colorPalette={colorPalettes[len - 1]}
				id={len - 1}
				willDisappear={barsWillDisappear}
			/>
			{len > 1 ? (
				<BarsInner
					colorPalette={colorPalettes[len - 2]}
					id={len - 2}
					willDisappear={true}
				/>
			) : null}
		</div>
	)
}

// the collection index is the index of the color palette with the list of color palletes
// the individual index is
function BarsInner({
	id,
	willDisappear,
	colorPalette,
}: {
	id: number
	willDisappear: boolean
	colorPalette: string[]
}): JSX.Element {
	return (
		<>
			{colorPalette.map(
				(color: string, idx: number): JSX.Element => (
					<div
						key={"" + id + "-" + idx}
						className={multipleClasses(
							styles[willDisappear ? `swipeOut${idx}` : `swipeIn${idx}`],
							styles.bar
						)}
						style={{ backgroundColor: color }}
					/>
				)
			)}
		</>
	)
}

export default memo(Bars)
