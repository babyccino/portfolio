import React from 'react';
import Image from 'next/image';

import { useInView } from 'react-intersection-observer';

import styles from './project.module.scss';

import { multipleClasses } from '../../util';

const Project = ({ color, title, description, image, technologies, links }) => {
  const options = {
    triggerOnce: true,
    rootMargin: '-200px 0px',
  };
  const [inViewRef, inView] = useInView(options);

  return (
    <div
      style={{transform: inView ? "translateY(0)" : "translateY(100px)", opacity: inView ? 1 : 0}}
      className={multipleClasses(styles.content, styles.project)}
      ref={inViewRef}
    >
      <div className={styles.contentInner}>
        <div className={styles.contentInnerInner}>
          <h3 style={{color}} className={styles.contentTitle}>{title}</h3>
          <span className={styles.description}>
            {description}
          </span>
          <div className={styles.technologiesAndLinks}>
            <div className={styles.technologies}>
              {technologies.join(" ")}
            </div>
            <div className={styles.links}>
              {links}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.image}>
        <Image src={image} style={{borderRadius: "10px"}} placeholder='blur' />
      </div>
    </div>
  );
};

export default Project;