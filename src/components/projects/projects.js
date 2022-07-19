import React from 'react';
import { useSelector } from 'react-redux';

import { useInView } from 'react-intersection-observer';

import styles from './projects.module.scss';

import Project from './project';

import { multipleClasses } from '../../util';

import data from './data';

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
          <h3 
            style={{color: colorPalette[2]}}
            className={styles.contentTitle}
          >My Projects</h3>
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
