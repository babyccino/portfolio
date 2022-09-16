import "../styles/globals.scss"

import { AppProps } from "next/app"
import Head from "next/head"

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import rootReducer from "../state/reducers"

const store = configureStore({
	reducer: rootReducer,
})

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Gus Ryan</title>
				<meta
					name="description"
					content="Gus Ryan's portfolio. Come and find out about me and my work"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icon.png" />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	)
}
