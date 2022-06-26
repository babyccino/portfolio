import React from 'react';
import { useSelector } from 'react-redux';

import styles from './content.module.scss';

import About from '../about/about';
import Projects from '../projects/projects';
import Icons from '../icons';

import { linearGradient } from '../../util';
import Contact from '../contact/contact';

const Content = () => {
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);

  return (
    <main className={styles.main}>
      
      <div className={styles.introduction}>
        <h3 className={styles.hi}>Hi, I&apos;m</h3>
        <h1 style={{backgroundImage: linearGradient("80deg", ...colorPalette, colorPalette[0])}} className={styles.name}>Gus Ryan.</h1>
        <h2 className={styles.tagline}>Will write code for food</h2>
      </div>

      <About />

      <Projects />

      <Contact />
      <div className={styles.footer}>
        <Icons color={colorPalette[0]} />
        Designed by Gus Ryan, thanks for checking it out!
      </div>
      
    </main>
  );
};

export default Content;
