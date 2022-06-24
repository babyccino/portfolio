import React from 'react';
import { useSelector } from 'react-redux';

import { useInView } from 'react-intersection-observer';
import { SocialIcon } from 'react-social-icons';

import { FaExternalLinkAlt } from 'react-icons/fa';

import styles from './projects.module.scss';

import Project from './project';

import { multipleClasses } from '../util';

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
    description: 'I created this portfolio page from scratch, using no css libraries, taking inspiration \
      from other portfolio sites but trying to add as much of my own flair as I could. I used css animations \
      as much as possible for performance.',
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

const Projects = () => {
  const options = {
    triggerOnce: true,
    rootMargin: '-200px 0px',
  };
  const [inViewRef, inView] = useInView(options);
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);

  return (
    <section
      className={multipleClasses(styles.content, styles.projects)}
      ref={inViewRef}
      id="projects"
    >
      <div className={styles.contentInner}>
        <div
          className={multipleClasses(styles.contentTitleContainer, styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
          style={{animationDelay: "200ms"}}
        >
          <h3 style={{color: colorPalette[2]}} className={styles.contentTitle}>My Projects</h3>
          <hr style={{borderColor: colorPalette[2]}} className={multipleClasses(styles.line, styles.projectLine)} />
        </div>
      </div>
      {data.map((datum, i) => (
        <div key={i} className={styles.project}>
          <Project
            color={colorPalette[(i + 3) % 5]}
            {...datum}
          />
        </div>
      ))}
    </section>
  );
};

export default Projects;
