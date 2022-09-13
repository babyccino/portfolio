import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import useCustomDispatch from "../../hooks/customDispatch"

import { useSwipeable } from "react-swipeable"

import styles from "./bars.module.scss"

import { multipleClasses } from "../../util"
import { State, IntroStatus as IntroStatusEnum } from "../../state/types"

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
	const firstBarDuration = 1 * 1000
	const animationTime =
		firstBarDuration * ((2 * -firstAngle) / (firstAngle + 90) + 1)

	if (introStatus === IntroStatusEnum.willDisappear)
		setTimeout(() => dispatch.notVisible(), animationTime)

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
	return (
		<div className={styles.container} {...handlers}>
			{colorPalettes[len - 1].map((color, ii) => (
				<div
					key={"" + len + " " + ii}
					className={multipleClasses(
						styles[
							introStatus < IntroStatusEnum.willDisappear
								? `swipeIn${ii}`
								: `swipeOut${ii}`
						],
						styles.bar
					)}
					style={{ backgroundColor: color }}
				/>
			))}
			{len <= 1
				? null
				: colorPalettes[len - 2].map((color, ii) => (
						<div
							key={"" + len + " " + ii}
							className={multipleClasses(styles[`swipeOut${ii}`], styles.bar)}
							style={{ backgroundColor: color }}
						/>
				  ))}
		</div>
	)
}

export default React.memo(Bars)
