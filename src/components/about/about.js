import React, {  } from 'react';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";

import { useSelector } from 'react-redux';

import styles from './about.module.scss';

import { multipleClasses } from '../../util';

import profile from '../../../public/profile.jpg';

const About = () => {
  const options = {
    triggerOnce: true,
    rootMargin: '-200px 0px',
  };
  const [inViewRef, inView] = useInView(options);
  const color = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1][1]);

  return (
    <section
      className={multipleClasses(styles.content, styles.about)}
      ref={inViewRef}
      id="about"
    >
      <div className={styles.contentInner}>
        <div
          className={multipleClasses(styles.contentTitleContainer, styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
          style={{animationDelay: "200ms"}}
        >
          <h3 style={{color: color}} className={styles.contentTitle}>About me</h3>
          <hr style={{borderColor: color}} className={styles.line} />
        </div>
        <span
          style={{display: "inline-block", animationDelay: "1500ms"}}
          className={multipleClasses(styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.          
          </p>
          <p>
            <br />Languages/technologies I&apos;ve used:
          </p>
          <p style={{color}} className={styles.technologies}>
            JavaScript React HTML CSS
          </p>
        </span>
      </div>
      <div
        className={multipleClasses(styles.image, styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
        style={{backgroundColor: color, animationDelay: "1000ms"}}
      >
        <Image
          src={profile}
          style={{filter: "grayscale(100%)", mixBlendMode: "multiply", borderRadius: "10px"}}
          alt="Picture of me"
        />
      </div>
    </section>
  );
};

export default About;