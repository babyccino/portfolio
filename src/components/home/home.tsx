import React, { useEffect, useRef, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSelector } from "react-redux"

import styles from "./home.module.scss"

import Intro from "../intro/intro"
const Header = dynamic(() => import("../header/header"))
const Content = dynamic(() => import("../content/content"))

import useCustomDispatch from "../../hooks/customDispatch"

import { IntroStatus as IntroStatusEnum, State } from "../../state/types"

const Home = (): JSX.Element => {
	const isIntroVisible = useSelector(
		({ introStatus }: State): boolean =>
			introStatus !== IntroStatusEnum.notVisible
	)
	const dispatch = useCustomDispatch()
	const removeEventListener = useRef(() => {})

	if (!isIntroVisible) {
		removeEventListener.current()
	}

	useEffect(() => {
		const onKeyDown = ({ code }: KeyboardEvent) => {
			if (code === "Enter") dispatch.requestUnmount()
		}

		document.addEventListener("keydown", onKeyDown)
		removeEventListener.current = () =>
			document.removeEventListener("keydown", onKeyDown)
		return removeEventListener.current
	}, [])

	return (
		<div className={styles.container}>
			{isIntroVisible ? (
				<Intro />
			) : (
				<Suspense>
					<Header />
					<Content />
				</Suspense>
			)}
		</div>
	)
}

export default Home
