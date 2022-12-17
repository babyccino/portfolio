import styles from "./data.module.scss"

import { StaticImageData } from "next/image"
import { FaExternalLinkAlt } from "react-icons/fa"

import { Icon } from "../icons/icons"

import portfolioImage from "../../../public/portfolio.jpg"
import countDownTimer from "../../../public/countdown-timer.jpg"
import letterBoxr from "../../../public/letterBoxr.jpg"
import donationReceipt from "../../../public/donation-receipt.jpg"
import barnesHut from "../../../public/barnes-hut.jpg"

export interface ProjectData {
	title: string
	description: string
	image: StaticImageData
	technologies: string[]
	links: JSX.Element[]
}

function GithubIcon({ repoName }: { repoName: string }): JSX.Element {
	return (
		<Icon
			defaultColor="rgb(230, 230, 230)"
			hoverColor="hsl(210, 80%, 80%)"
			url={`https://github.com/${repoName}`}
			style={{ animation: "none", opacity: 1 }}
			label={`github project ${repoName}`}
		/>
	)
}
function VercelIcon({ projectName }: { projectName: string }): JSX.Element {
	return (
		<a
			href={`https://${projectName}.vercel.app/`}
			className={styles.vercel}
			aria-label={`vercel ${projectName}`}
		>
			<FaExternalLinkAlt />
		</a>
	)
}

const projectsData: ProjectData[] = [
	{
		title: "Portfolio Website",
		description:
			"I created this portfolio page, using no css libraries, taking inspiration from \
			other portfolio sites while adding my own flair. I used css over js animations as \
			much as possible for performance. I have tried to make the site fully accessible \
			 by supporting motion reduction and making sure the site is usable without a mouse.",
		image: portfolioImage,
		technologies: ["react.js", "next.js", "redux", "figma"],
		links: [
			<GithubIcon key="0" repoName="babyccino/portfolio" />,
			<VercelIcon key="1" projectName="babyccino-portfolio" />,
		],
	},
	{
		title: "Barnes-Hut Simulation",
		description:
			"I studied this algorithm in a Scala course on parallel programming and thought it \
			would be a fun project to make a visualisation web app. There were various challenges \
			with the animations including one which was identical to the “merge intervals” medium \
			Leetcode problem ",
		image: barnesHut,
		technologies: ["react.js", "next.js", "typescript", "tailwindcss"],
		links: [
			<GithubIcon key="0" repoName="babyccino/barnes-hut" />,
			<VercelIcon key="1" projectName="barnes-hut" />,
		],
	},
	{
		title: "Countdown Timer",
		description:
			"A simple full stack application to create countdown timers which I created to test \
			my back-end skills and teach myself typescript. The application leverages NextJS to \
			statically generate all pages of the app to maintain performance without database caching.",
		image: countDownTimer,
		technologies: [
			"typescript",
			"react.js",
			"next.js",
			"tailwindcss",
			"figma",
			"sql",
			"prisma",
		],
		links: [
			<GithubIcon key="0" repoName="babyccino/countdown-timer" />,
			<VercelIcon key="1" projectName="countdown-timer-babyccino" />,
		],
	},
	{
		title: "LetterBoxr",
		description:
			"Instagram only allows photos with aspect ratios between 4:5 and 16:9 for posts, and \
      only gives you the option to crop when posting photos outside this range. I created \
      give me and others an easy option to letterbox our images instead of cropping.",
		image: letterBoxr,
		technologies: ["react.js", "sass", "redux", "figma"],
		links: [
			<GithubIcon key="0" repoName="babyccino/Letterboxr" />,
			<VercelIcon key="1" projectName="letterboxr" />,
		],
	},
	{
		title: "QBO Donation Receipts",
		description:
			"While QuickBooks Online is the most popular accounting software it gives no option \
			for generating yearly donation receipts for non-profits. I found third party \
			applications lacking so I created one myself. The application takes CSV data in \
			the form and generates simple PDF donation receipts",
		image: donationReceipt,
		technologies: ["node.js", "google-api", "nodemailer", "pdfkit"],
		links: [<GithubIcon key="0" repoName="babyccino/donation-receipts" />],
	},
]

export default projectsData
