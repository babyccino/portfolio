import "../styles/globals.scss"

import { AppProps } from "next/app"
import Head from "next/head"

import { NextSeo } from "next-seo"

import ReduxProvider from "../state/reduxProvider"

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
			<NextSeo
				title="Gus Ryan | Portfolio"
				description="Come and check out my work!"
				openGraph={{
					url: "https://www.gusryan.me",
					images: [
						{
							url: "/open-graph.jpg",
							width: 800,
							height: 600,
							alt: "Hi I'm Gus Ryan. I enjoy creating things for the internet.",
							type: "image/jpeg",
						},
					],
				}}
				twitter={{
					cardType: "summary_large_image",
				}}
			/>

			<ReduxProvider>
				<Component {...pageProps} />
			</ReduxProvider>
		</>
	)
}
