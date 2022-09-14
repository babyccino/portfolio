import { StaticImageData } from "next/image"
import { SocialIcon } from "react-social-icons"
import { FaExternalLinkAlt } from "react-icons/fa"

import portfolioImage from "../../../public/portfolio.jpg"
import countDownTimer from "../../../public/countdown-timer.jpg"
import letterBoxr from "../../../public/letterBoxr.jpg"
import donationReceipt from "../../../public/donation-receipt.jpg"

export interface ProjectData {
	title: string
	description: string
	image: StaticImageData
	technologies: string[]
	links: JSX.Element[]
}

function GithubIcon({ repoName }: { repoName: string }): JSX.Element {
	return (
		<SocialIcon
			key={repoName}
			bgColor="rgba(0,0,0,0)"
			fgColor="rgb(230, 230, 230)"
			url={`https://github.com/${repoName}`}
		/>
	)
}
function VercelIcon({ projectName }: { projectName: string }): JSX.Element {
	return (
		<a
			key={projectName}
			href={`https://${projectName}.vercel.app/`}
			style={{
				display: "flex",
				alignItems: "center",
				transform: "scale(1.5)",
				height: "50px",
				color: "rgb(230, 230, 230)",
			}}
		>
			<FaExternalLinkAlt />
		</a>
	)
}

const projectsData: ProjectData[] = [
	{
		title: "Portfolio Website",
		description:
			"I created this portfolio page from scratch, using no css libraries, taking inspiration \
      from other portfolio sites but trying to add as much of my own flair as I could. I used css animations \
      as much as possible for performance.",
		image: portfolioImage,
		technologies: ["react.js", "next.js", "sass", "redux", "figma"],
		links: [
			<GithubIcon repoName="babyccino/portfolio" />,
			<VercelIcon projectName="babyccino-portfolio" />,
		],
	},
	{
		title: "Countdown Timer",
		description:
			"A simple full stack application to create countdown timers which I created to test my back-end skills \
			and teach myself typescript. The application leverages NextJS to statically generate all pages of the app \
			to maintain performance without database caching.",
		image: countDownTimer,
		technologies: [
			"TypeScript",
			"react.js",
			"next.js",
			"TailwindCSS",
			"figma",
			"SQL",
			"PrismaORM",
		],
		links: [
			<GithubIcon repoName={"babyccino/countdown-timer"} />,
			<VercelIcon projectName="countdown-timer-babyccino" />,
		],
	},
	{
		title: "LetterBoxr",
		description:
			"Instagram only allows photos with aspect ratios between 4:5 and 16:9 for posts, and \
      only gives you the option to crop when posting photos outside this range. I created this site to \
      give me and others an easy option to letterbox our images instead of cropping.",
		image: letterBoxr,
		technologies: ["react.js", "sass", "redux", "figma"],
		links: [
			<GithubIcon repoName={"babyccino/Letterboxr"} />,
			<VercelIcon projectName="letterboxr" />,
		],
	},
	{
		title: "QBO Donation Receipts",
		description:
			"While QuickBooks Online is the most popular accounting software it gives no option for generating \
      yearly donation receipts for non-profits. I found third party applications lacking so I created one myself. \
      The application takes CSV data in the form and generates simple PDF donation receipts",
		image: donationReceipt,
		technologies: ["node.js", "GoogleAPI", "nodemailer", "pdfkit"],
		links: [<GithubIcon repoName={"babyccino/donation-receipts"} />],
	},
]

export default projectsData
