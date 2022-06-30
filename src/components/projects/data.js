import { SocialIcon } from 'react-social-icons';
import { FaExternalLinkAlt } from 'react-icons/fa';

import portfolioImage from '../../../public/portfolio.jpg';
import letterBoxr from '../../../public/letterBoxr.jpg';

const data = [
  {
    title: "Portfolio Website",
    description: 'I created this portfolio page from scratch, using no css libraries, taking inspiration \
      from other portfolio sites but trying to add as much of my own flair as I could. I used css animations \
      as much as possible for performance.',
    image: portfolioImage,
    technologies: ["react.js","next.js","sass","redux","figma"],
    links: [
      <SocialIcon
        key={0}
        bgColor='rgba(0,0,0,0)'
        fgColor='rgb(230, 230, 230)'
        url={"https://github.com/babyccino/portfolio"}
      />,
      <a 
        key={1}
        href="https://portfolio-babyccino.vercel.app/"
        style={{display: "flex", alignItems: "center", transform: "scale(1.5)", height: "50px", color: "rgb(230, 230, 230)"}}
      >
        <FaExternalLinkAlt />
      </a>,
    ]
  },
  {
    title: "LetterBoxr",
    description: 'Instagram only allows photos with aspect ratios between 4:5 and 16:9 for posts, and \
      only gives you the option to crop when posting photos outside this range. I created this site to \
      give me and others an easy option to letterbox our images instead of cropping.',
    image: letterBoxr,
    technologies: ["react.js","sass","redux","figma"],
    links: [
      <SocialIcon
        key={0}
        bgColor='rgba(0,0,0,0)'
        fgColor='rgb(230, 230, 230)'
        url={"https://github.com/babyccino/Letterboxr"}
      />,
      <a
        key={1}
        href="https://letterboxr.vercel.app/"
        style={{display: "flex", alignItems: "center", transform: "scale(1.5)", height: "50px", color: "rgb(230, 230, 230)"}}
      >
        <FaExternalLinkAlt />
      </a>,
    ]
  },
];

export default data;
